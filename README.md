# 笛子 / 竖笛 B A G 基础练习曲集与互动教学系统 🪈

本项目是专为初学笛子/竖笛（Recorder / Flute）的学生与音乐教师设计的**互动网页教学系统**。系统以学生已掌握的三个基本音符 **B (7 / Si)**、**A (6 / La)**、**G (5 / Sol)** 为起点，提供循序渐进的练习曲，并在文末解锁新音符 **高音 C (1 / Do)**。

- **GitHub Pages 在线访问**: [https://moxiuren.github.io/recorder-bag-tutorial/](https://moxiuren.github.io/recorder-bag-tutorial/)
- **GitHub 源码仓库**: [https://github.com/moxiuren/recorder-bag-tutorial](https://github.com/moxiuren/recorder-bag-tutorial)

---

## 🌟 核心功能与亮点

1. **双乐器指法图解支持**：
   - 🪈 **8孔 C调高音竖笛 (Soprano Recorder)**
   - 🎋 **6孔中国竹笛 (Bamboo Flute)**
   - 实时矢量 SVG 图解，点击直观预览按孔位置与试听发音。

2. **渐进式练习曲库（共 8 首曲目）**：
   - **基础阶段 (Warm-up & Tonguing)**：三音长音练习、吐音与节奏小练习。
   - **经典入门 (Classic Songs)**：《热十字包》(Hot Cross Buns)、《玛莉的小羊》(Mary Had a Little Lamb)。
   - **稍长进阶 (Longer Master Pieces)**：《月光下》(Au Clair de la Lune)、16小节稍长综合曲《三音欢唱狂想曲》。
   - **新音解锁 (New Note Unlock)**：《高音 C 跳跃队》、《四音阶小舞曲 (G A B C)》。

3. **智能交互与音频跟练系统**：
   - **双乐谱模式**：五线谱 (Staff) 与 简谱 (Numbered Notation) 一键无缝切换。
   - **Web Audio API 笛音合成**：采用波形混音、柔和包络线与吹奏白噪声模拟逼真笛声。
   - **实时动画跟练**：支持 BPM 速度调节 (40-140 BPM)、节拍器辅助以及播放时**动态指法跟随引导**。

4. **课堂互动与教学拓展**：
   - **终极挑战：新音 C (高音1) 解锁**：清晰指法要领对比（抬起食指按住中指）。
   - **指法眼疾手快小测试**：实时计分测试学生指法记忆。
   - **打印优化**：支持 `Ctrl+P` / `Cmd+P` 一键导出/打印纸质乐谱。

---

## 📁 目录结构

```
recorder-bag-tutorial/
├── index.html   # 主教学 HTML 页面
├── styles.css   # 响应式设计系统与打印样式
├── app.js       # ABCjs 乐谱渲染、Web Audio 吹奏合成器、指法 SVG 引擎与跟练逻辑
└── README.md    # 项目说明文档
```

---

## 🛠️ 本地运行

本系统为零依赖纯前端架构，无需安装 Node.js 或构建步骤：

1. 克隆本仓库：
   ```bash
   git clone https://github.com/moxiuren/recorder-bag-tutorial.git
   ```
2. 直接双击打开 `index.html` 或在本地启动任意静态服务器（如 Python `python3 -m http.server`）。
