
# 🪄 Layout Studio Pro (排版工作室)

**Layout Studio Pro** 是一款专业的双模式 Markdown 排版与编辑工具，专为**学术写作**与**社交媒体分享**设计。

它允许用户在一个统一的界面中编写 Markdown 内容，并实时预览生成的专业级排版效果。无论是需要严谨的 A4 论文格式，还是优雅的微信公众号长图，Layout Studio Pro 都能轻松搞定。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg?style=flat&logo=tailwindcss)

## ✨ 核心功能 (Features)

### 1. 双模式排版引擎
*   **📜 学术模式 (Academic Mode)**:
    *   标准的 A4 纸张模拟渲染。
    *   支持三线表 (SCI 风格)、数学公式 ($E=mc^2$)、参考文献自动标号。
    *   支持导出为 **Word (.docx)** 和 **PDF** (打印)。
*   **📱 社交模式 (Digital/Social Mode)**:
    *   专为手机阅读优化的窄屏布局。
    *   支持一键**复制 HTML** (直接粘贴至微信公众号后台) 或**导出长图**。

### 2. 多样化视觉风格
在社交模式下，支持一键切换多种设计风格：
*   **🏮 Lantern 复古风格**: 仿古书籍排版，宋体/楷体混排，Times New Roman 序号，适合人文历史类内容。
*   **📐 Linear 极简风格**: 现代科技感，渐变色标题，圆角卡片设计，适合技术博客或产品介绍。
*   **📔 Diary 手札风格**: 手写体字体，便利贴、拍立得照片效果，适合生活日记或情感分享。

### 3. 🪄 AI 排版魔杖 (AI Magic)
内置 AI 辅助功能，可以自动将杂乱的文本转换为结构清晰的 Markdown：
*   **自定义 API**: 支持 OpenAI, DeepSeek, Moonshot 等兼容 OpenAI 格式的 API。
*   **智能识别**: 自动识别标题层级、修正列表格式、识别表格数据。

### 4. 专业编辑器
*   支持 Markdown/TXT 文件导入。
*   实时双栏预览。
*   LaTeX 数学公式完美支持 (基于 Katex)。

## 🛠️ 技术栈 (Tech Stack)

*   **Frontend**: React 18, TypeScript, Vite (或 CRA)
*   **Styling**: Tailwind CSS
*   **Rendering**: React-Markdown, Remark (GFM, Math), Rehype (Katex)
*   **Export**: docx (Word导出), html-to-image (图片生成)

## 🚀 快速开始 (Getting Started)

### 环境要求
*   Node.js >= 16.0.0
*   npm 或 yarn

### 安装

1.  克隆仓库
    ```bash
    git clone https://github.com/your-username/layout-studio-pro.git
    cd layout-studio-pro
    ```

2.  安装依赖
    ```bash
    npm install
    # 或者
    yarn install
    ```

3.  启动开发服务器
    ```bash
    npm start
    # 或者如果使用 Vite
    npm run dev
    ```

4.  构建生产版本
    ```bash
    npm run build
    ```

## 📖 使用指南

1.  **左侧编辑**: 在左侧输入标准的 Markdown 语法。
2.  **切换模式**: 点击左侧边栏的 "论文 A4" 或 "社交分享" 切换预览模式。
3.  **调整风格**: 在社交模式下，选择 "复古"、"极简" 或 "手札" 风格。
4.  **AI 辅助**: 点击侧边栏紫色的 "AI Layout Magic" 区域，点击齿轮图标配置你的 API Key，然后点击 "Auto-Format" 自动美化文本。
5.  **导出**: 使用侧边栏底部的按钮导出 Word、PDF 或图片。

## 🤝 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request！

1.  Fork 本仓库
2.  新建分支 (`git checkout -b feature/AmazingFeature`)
3.  提交更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  提交 Pull Request

## 📄 许可证 (License)

Distributed under the MIT License. See `LICENSE` for more information.
