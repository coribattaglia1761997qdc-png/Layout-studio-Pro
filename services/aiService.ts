
import { AiConfig } from '../types';

export const enhanceTextWithAi = async (text: string, config: AiConfig): Promise<string> => {
  if (!config.apiKey) {
    throw new Error("请先配置 API Key");
  }

  // 1. 健壮的 URL 构建逻辑
  let url = config.baseUrl.trim().replace(/\/$/, '');
  
  // 如果用户没有明确写 /chat/completions，尝试自动补全
  if (!url.includes('/chat/completions')) {
      if (url.endsWith('/v1')) {
          url = `${url}/chat/completions`;
      } else {
          // 默认假设是基础域名 (如 https://api.openai.com) -> 补全标准路径
          url = `${url}/v1/chat/completions`;
      }
  }

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

  // 2. 设置超时控制 (60秒)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

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
        temperature: 0.3 // 低温度以保证格式稳定
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("AI 未返回任何内容");
    }

    // 清理可能存在的 Markdown 代码块包裹
    return result.replace(/^```markdown\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error("AI Service Error:", error);
    
    if (error.name === 'AbortError') {
        throw new Error("请求超时：AI 服务响应时间过长 (超过60秒)。");
    }

    // 3. 针对 "Failed to fetch" 提供详细的排查建议
    if (error instanceof TypeError && (error.message === 'Failed to fetch' || error.message.includes('NetworkError'))) {
        throw new Error(
            `网络请求失败 (Failed to fetch)。\n\n可能原因：\n` +
            `1. 跨域限制 (CORS): 服务商不支持浏览器直接调用。尝试更换支持 CORS 的代理地址。\n` +
            `2. 地址错误: 请检查 Base URL (${url}) 是否正确。\n` +
            `3. 混合内容: 如果你在 HTTPS 环境(如 GitHub Pages)，不能调用 HTTP 接口(如本地 localhost)。\n` +
            `4. 网络问题: 检查网络连接或代理/VPN 设置。`
        );
    }
    
    throw error;
  }
};
