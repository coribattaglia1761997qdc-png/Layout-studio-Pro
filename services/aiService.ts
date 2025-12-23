
import { AiConfig } from '../types';

export const enhanceTextWithAi = async (text: string, config: AiConfig): Promise<string> => {
  if (!config.apiKey) {
    throw new Error("Please configure your API Key first.");
  }

  // Ensure Base URL doesn't end with slash if user adds it, and append chat/completions if missing
  // This is a basic heuristic for OpenAI compatible endpoints
  let url = config.baseUrl.replace(/\/$/, '');
  if (!url.endsWith('/v1') && !url.includes('/chat/completions')) {
      // User provided root domain like https://api.deepseek.com -> append /v1
      url = `${url}/v1/chat/completions`;
  } else if (url.endsWith('/v1')) {
      // User provided https://api.deepseek.com/v1 -> append /chat/completions
      url = `${url}/chat/completions`;
  }
  // If user provided full path, use it as is.

  const prompt = `You are a professional Markdown typesetting assistant. 
  Your task is to reformat the following text into clean, structured Markdown WITHOUT changing the original content, wording, or language.
  
  Rules:
  1. Detect titles and apply appropriate Heading levels (#, ##, ###).
  2. Fix list formatting (bullet points and numbered lists).
  3. Format tables if you detect data that looks like a table.
  4. Fix paragraph spacing and indentation.
  5. Apply bold/italic for emphasis where appropriate based on context.
  6. Ensure math formulas are wrapped in $ or $$.
  7. Return ONLY the formatted Markdown content. Do not add "Here is the result" or markdown fences like \`\`\`markdown.`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: text }
        ],
        temperature: 0.3 // Low temperature for deterministic formatting
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("No content received from AI.");
    }

    // Clean up if AI wraps it in code blocks despite instructions
    return result.replace(/^```markdown\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');

  } catch (error: any) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
