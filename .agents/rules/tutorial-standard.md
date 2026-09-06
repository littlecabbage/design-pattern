# 设计模式教程页面研发规范与统一组件标准 (Tutorial Design System Spec)

本文档规定了 `design-pattern` 项目中所有设计模式独立 HTML 教程页面的结构、视觉风格、必须包含的组件规范以及禁止出现的模式。所有新增与重构的教程页面必须 100% 遵从此规范。

---

## 1. 页面标准结构与统一章节编排

每个模式页面必须保持严谨的 8 大标准模块（Section 00 ~ Section 07）：

| 章节编号 | 锚点 ID | 模块名称 | 规范与核心组件要求 |
| :--- | :--- | :--- | :--- |
| **Section 00** | `#section-glossary` | **初学者概念大白话速查字典** | **【强制可折叠】** 默认收起 (`display: none`)，顶部渐变栏点击展开/折叠 (`toggleGlossary()`)，内置关键字实时过滤搜索框与网格卡片。 |
| **Section 01** | `#section-intro` | **直觉认知与痛点具象化** | 生活化故事/比喻导入 + **痛点反模式 vs 模式解法** 双栏对比卡片。 |
| **Section 02** | `#section-uml-guide` | **UML 蓝图破壁机：极简图例与关系速通** | UML 类图三层箱体结构教学 + 属性/方法可见性符号对照 + 6 种 UML 关联关系对比表。 |
| **Section 03** | `#section-core` | **模式核心角色与 5 步交互式 UML 类图** | 核心角色 Bento 卡片网格 + **5 步交互式 SVG 矢量类图播放器**（支持高亮当前元素、步骤切换与同步教学详解卡片）。 |
| **Section 04** | `#section-code` | **代码实战：工业级工程文件与开发全过程** | **【强制两栏 IDE 目录树】** 左侧文件树侧边栏 (`.py-tree-container`，Step 01~07 步骤切换，文件夹折叠)，右侧面包屑、代码高亮视口、解释横幅与底部 Mac 终端仿真器。 |
| **Section 05** | `#section-sequence` | **动态运行期时序剖析 (Sequence Diagram)** | **【强制交互式 SVG 时序图播放器】** 动态参与者生命线、激活条 (Activation Bars)、单步消息箭头高亮 (`#seq-msg-1..7`)、同步教学卡片与 Mermaid 备用视图切换。 |
| **Section 06** | `#section-principles`| **深入反思：设计原则与横向对比** | SOLID 原则针对性深度践行剖析 + 优缺点 (Pros & Cons) 辩证卡片 + 创建型/结构型横向对比矩阵 + 架构避坑 FAQ。 |
| **Section 07** | `#section-quiz` | **知识巩固：极速自测闯关** | 4 道精选交互式选择题，即时正确/错误反馈 + 原理解析 + 彩带庆祝特效 (`canvas-confetti`)。 |

---

## 2. 核心组件开发标准细则

### 2.1 初学者概念大白话速查字典 (`#section-glossary`)
- **必须支持可折叠**：严禁页面加载时默认完全展开挤占视口空间。
- **默认状态**：主体内容 `#glossary-content` 的初始样式必须为 `display: none;`。
- **切换交互**：
  ```javascript
  function toggleGlossary() {
      const content = document.getElementById('glossary-content');
      const toggleText = document.getElementById('glossary-toggle-text');
      const toggleBtn = document.getElementById('glossary-toggle-btn');
      if (content.style.display === 'none' || !content.style.display) {
          content.style.display = 'block';
          if (toggleText) toggleText.innerText = '收起字典 ▴';
          if (toggleBtn) toggleBtn.style.transform = 'rotate(180deg)';
      } else {
          content.style.display = 'none';
          if (toggleText) toggleText.innerText = '展开字典 ▾';
          if (toggleBtn) toggleBtn.style.transform = 'rotate(0deg)';
      }
  }
  ```

### 2.2 Python 工程代码两栏 IDE 目录树 (`#section-code`)
- **严禁**：采用单列平铺或简单的 3 个水平按钮切换代码。
- **必须**：
  1. **左侧目录树侧边栏 (Explorer)**：
     - 固定顶部步骤控制器：展示当前 Step 序号、总步数、动态进度条以及「← 上一步 / 下一步 →」按钮。
     - 真实工程目录结构：如 `base/`、`builders/`、`directors/`、`main.py` 等。
     - 文件条目：展示图标、文件名和 Step 标签徽章 (`Step 01` ~ `Step 07`)。
     - 支持文件夹点击折叠/展开 (`toggleHtmlFolder(folderId)`)。
  2. **右侧代码视口与解释横幅**：
     - 面包屑与一键复制代码按钮。
     - 专属文件设计解释横幅（包含当前步骤徽章、角色定位、架构思考与为什么先写此文件）。
     - 代码高亮区（基于 `hljs`）。
     - 底部运行控制台 (Mac 终端红黄绿三色圆点，包含「▶ 点击运行 python main.py」以及逼真的流式执行日志)。

### 2.3 动态运行期时序图播放器 (`#section-sequence`)
- **严禁**：仅放一张静态的 Mermaid 图或没有交互的图片。
- **必须**：
  1. 提供 7 步横向切换按钮栏 (`.seq-step-tab-btn`)。
  2. 提供「← 上一步 / 下一步 →」控制器，并监听键盘 `ArrowLeft` / `ArrowRight` 左右方向键导航。
  3. **交互式 SVG 矢量时序图**：
     - 明确的参与者矩形头与垂直虚线生命线 (Lifeline)。
     - 矩形激活条 (Activation Bars) 随当前调用状态激活。
     - 分步消息连线与文字气泡（当前步 100% 不透明度，非当前步设为 `0.22` 透明度）。
     - 符合 UML 语义的箭头：实线带实心三角箭头 (同步请求)、虚线带开放箭头 (返回消息)。
  4. 同步联动教学卡片 (`#seq-teaching-card`)：
     - 动态更新当前调用方向 (`Client → Builder`)。
     - 展示具体执行的代码方法 (`builder.reset()`)。
     - 三栏教学核心要点：🎯 教学要点、🔍 底层机制、📐 UML 规范。
  5. 顶部支持双视图切换（🎨 交互式矢量图 / 📊 Mermaid 渲染）。

### 2.4 样式与布局红线 (Anti-Patterns)
- **禁止添加未经团队批准的实验性异构小组件**（例如 Live Assembly Studio 等与现有教程架构不兼容的异构面板）。
- **色彩与设计风格**：必须沿用全局统一的浅色优雅卡片体系 (`--primary: #4f46e5`, `--bg-surface: #ffffff`, `--border-light: #e2e8f0`, `--text-primary: #0f172a`, `--font-mono: JetBrains Mono / Fira Code`)。
- **双向同步保障**：编辑 `design-pattern-html/` 对应文件后，必须同步更新 `public/design-pattern-html/` 镜像文件，确保生产与预览一致。
