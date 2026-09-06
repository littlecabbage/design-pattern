# GoF 23 设计模式项目规范与研发指南 (AGENTS.md)

欢迎来到 `design-pattern` 深度教学知识库。本工程致力于使用最现代、最地道、最直观的交互方式向初学者和资深工程师讲解 GoF 23 种经典设计模式。

## 1. 统一研发规范参考

所有 HTML 教程页面的开发必须严格遵守 [.agents/rules/tutorial-standard.md](file:///.agents/rules/tutorial-standard.md) 所定义的规范：

1. **初学者概念大白话速查字典 (`#section-glossary`)**：
   - **必须可折叠**，默认初始状态收起 (`display: none;`)。
   - 点击顶部横幅调用 `toggleGlossary()` 切换折叠/展开，并配合箭头动画。
   - 包含术语实时过滤搜索框与网格卡片。

2. **Python 工程代码演进 (`#section-code`)**：
   - 必须采用**两栏式 IDE 目录树布局** (`.py-tree-container`)。
   - 左侧展示完整工程目录树与步骤导航控制器 (Step 01 ~ Step 07)。
   - 右侧展示面包屑、复制按钮、设计考量横幅、语法高亮代码以及底部 Terminal 控制台。

3. **动态运行期时序图剖析 (`#section-sequence`)**：
   - 必须提供**多步骤交互式 SVG 矢量时序图播放器**。
   - 包含参与者生命线、激活条、高亮消息箭头以及同步教学要点卡片。
   - 支持键盘方向键导航与备用 Mermaid 视图切换。

4. **严禁引入异构非标组件**：
   - 禁止在单个页面私自添加未统一的标准组件（如 Live Assembly Studio）。
   - 保持所有 23 种设计模式页面的结构一致性与视觉美学统一。

5. **双向同步**：
   - 修改 `design-pattern-html/` 文件后，必须同步复制更新到 `public/design-pattern-html/` 镜像目录。
