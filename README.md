# 🎨 深入浅出 GoF 设计模式：基于 AI Agent 架构实战教学

<p align="center">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-4f46e5?style=for-the-badge&logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Python-3.11+-3776ab?style=for-the-badge&logo=python" alt="Python 3.11" />
  <img src="https://img.shields.io/badge/UML-2.5%20Standard-f59e0b?style=for-the-badge" alt="UML 2.5" />
</p>

<p align="center">
  <strong>告别死记硬背枯燥的动物画图案例！</strong><br>
  面向现代软件架构师与 AI 工程师的 <strong>GoF 23 种设计模式交互式教学系统</strong>。<br>
  将经典面向对象设计原则与当今最前沿的 <strong>AI Agent (智能体) 基础设施生态</strong> 深度结合，手把手带你理解工业级解耦思想、UML 建模与 Python 3.11+ 生产级架构实现。
</p>

---

## 🌐 在线交互式体验入口 (Live Pages)

无需配置本地环境，点击下方链接即可直接在浏览器中体验全功能交互课件：

| 入口类型 | 在线体验链接 | 说明 |
| :--- | :--- | :--- |
| 🏠 **总览导航大厅 (Hub Portal)** | **[👉 点击进入设计模式总览主页](https://littlecabbage.github.io/design-pattern/)** | 包含 23 种设计模式分类检索、路线图与各章节直达入口 |
| 📘 **01 · 工厂方法模式** | **[👉 01-factory-method-pattern.html](https://littlecabbage.github.io/design-pattern/design-pattern-html/01-creational/01-factory-method-pattern.html)** | 解密 CodeAgent 与 ResearchAgent 的动态生命周期流水线 |
| 🏛️ **02 · 抽象工厂模式** | **[👉 02-abstract-factory-pattern.html](https://littlecabbage.github.io/design-pattern/design-pattern-html/01-creational/02-abstract-factory-pattern.html)** | 解决本地涉密栈 vs 云端高并发栈的产品族协同与混搭痛点 |

---

## 💡 为什么结合 AI Agent 场景教学？

传统设计模式教学常使用“画圆形矩形”、“动物叫声”等玩具案例，初学者看完往往“懂了语法却不知道在真实业务中有什么用”。

在现代工业级 **AI Agent 系统** 研发中，设计模式正是解决复杂度的核心武器：
- **创建型模式**：解决大模型大脑 (LLM)、长期向量记忆 (Vector DB) 与安全执行沙箱 (Sandbox) 的成套生态初始化与环境热插拔；
- **结构型模式**：解决将传统 REST API 适配为 MCP (Model Context Protocol) 标准工具协议、流式输出审计装饰等难题；
- **行为型模式**：解决 Multi-Agent 多智能体总线广播协同、输入敏感词安全拦截责任链、自主反思状态机循环。

---

## 📊 GoF 23 种设计模式教学路线图

### 01. 创建型模式 (Creational Patterns) · 5 种
| 序号 | 模式名称 | 核心定位与 AI Agent 落地场景 | 状态 | 在线课件 |
| :---: | :--- | :--- | :---: | :---: |
| **01** | **工厂方法模式** *(Factory Method)* | 多态创建 · 解耦 CodeAgent 与 ResearchAgent 生命周期流水线 | 🟢 已上线 | [进入学习](https://littlecabbage.github.io/design-pattern/design-pattern-html/01-creational/01-factory-method-pattern.html) |
| **02** | **抽象工厂模式** *(Abstract Factory)* | 产品族生态 · 本地涉密隔离栈 vs 云端高并发栈成套热插拔 | 🟢 已上线 | [进入学习](https://littlecabbage.github.io/design-pattern/design-pattern-html/01-creational/02-abstract-factory-pattern.html) |
| **03** | **单例模式** *(Singleton)* | 全局唯一 · Agent 集中式 Token 计量网关与 Embedding 缓存 | 🟡 规划中 | 敬请期待 |
| **04** | **建造者模式** *(Builder)* | 链式装配 · 复杂 Agent 执行管线 (Prompt+工具+记忆+权限) | 🟡 规划中 | 敬请期待 |
| **05** | **原型模式** *(Prototype)* | 状态快照 · 智能体思维链 (Tree-of-Thought) 分支环境深度克隆 | 🟡 规划中 | 敬请期待 |

### 02. 结构型模式 (Structural Patterns) · 7 种
| 序号 | 模式名称 | 核心定位与 AI Agent 落地场景 | 状态 |
| :---: | :--- | :--- | :---: |
| **06** | **适配器模式** *(Adapter)* | 协议转换 · 将传统 REST/GraphQL API 转换为 Agent MCP 标准工具 | 🟡 规划中 |
| **07** | **装饰器模式** *(Decorator)* | 动态增强 · 无侵入叠加流式输出、Token 预算限流与安全脱敏 | 🟡 规划中 |
| **08** | **代理模式** *(Proxy)* | 访问控制 · 本地 Agent 对远程 GPU 推理集群的虚拟代理与断网降级 | 🟡 规划中 |
| **09** | **外观模式** *(Facade)* | 极简门面 · 对外暴露统一 `auto_solve()`，隐藏 Planning/RAG 复杂细节 | 🟡 规划中 |
| **10** | **桥接模式** *(Bridge)* | 独立演进 · Agent 业务角色层与底层推理后端的双维度解耦 | 🟡 规划中 |
| **11** | **组合模式** *(Composite)* | 树形结构 · Multi-Agent 树状团队组织架构与任务递归分解 | 🟡 规划中 |
| **12** | **享元模式** *(Flyweight)* | 细粒度共享 · 海量 Agent 共享预编译 Prompt 模板与 Embedding 权重 | 🟡 规划中 |

### 03. 行为型模式 (Behavioral Patterns) · 11 种
| 序号 | 模式名称 | 核心定位与 AI Agent 落地场景 | 状态 |
| :---: | :--- | :--- | :---: |
| **13** | **策略模式** *(Strategy)* | 算法替换 · ReAct 单步决策 / Plan-Solve 批处理 / ToT 树搜索动态切换 | 🟡 规划中 |
| **14** | **观察者模式** *(Observer)* | 事件总线 · Leader 任务分解事件自动广播给各 Worker 智能体监听 | 🟡 规划中 |
| **15** | **责任链模式** *(Chain of Responsibility)* | 多层防护 · Prompt 注入防御 -> 敏感词过滤 -> 代码静态审查流水线 | 🟡 规划中 |
| **16** | **状态模式** *(State)* | 状态驱动 · [IDLE] -> [PLANNING] -> [EXECUTING] -> [REFLECTING] 状态机 | 🟡 规划中 |
| **17** | **命令模式** *(Command)* | 请求封装 · Agent 工具调用 (Tool Call) 的序列化、撤销与回放队列 | 🟡 规划中 |
| **18** | **模板方法** *(Template Method)* | 骨架约束 · 定义 Agent 思考-行动-反思标准骨架，子类重写特定环节 | 🟡 规划中 |
| **19** | **迭代器模式** *(Iterator)* | 统一遍历 · 流式遍历多模态 Token 输出与向量检索分页结果 | 🟡 规划中 |
| **20** | **中介者模式** *(Mediator)* | 网状解耦 · 多 Agent 复杂网状消息通过通信 Hub 集中转发调度 | 🟡 规划中 |
| **21** | **备忘录模式** *(Memento)* | 历史回溯 · 对话 Session 历史快照保存与特定断点精准回滚 | 🟡 规划中 |
| **22** | **访问者模式** *(Visitor)* | 操作分离 · 对 Agent 生成的代码语法树 (AST) 进行安全与格式分析 | 🟡 规划中 |
| **23** | **解释器模式** *(Interpreter)* | 语法解析 · 自定义 Agent DSL 任务控制指令的解释与执行引擎 | 🟡 规划中 |

---

## ✨ 教学课件核心特色

- 🎨 **5 步交互式 UML 类图播放器**：从提炼抽象产品到具体工厂闭环，逐步高亮节点与连线，联动剖析 🎯 架构要点、📐 UML 规范与 🗣️ 通俗比喻。
- ⏱️ **7 步动态运行期时序图**：可视化展示对象生命线、激活条与消息流转，支持键盘 `←` / `→` 快捷步进。
- 💻 **工程级 IDE 文件浏览器**：按照真实架构开发顺序（Step 01 ~ Step 07）分步展示 Python 3.11+ 类型注解严谨实现，并内置 **可点击运行的终端模拟器**。
- 📖 **初学者概念大白话速查字典**：“xxx是xxx，如果你不理解，你就理解为xxx”，彻底攻克 ABC、OCP、DIP、产品族等抽象名词。

---

## 🛠️ 本地运行与二次开发

本项目基于 **React 18 + Vite 6 + TypeScript** 构建，支持热重载：

```bash
# 1. 克隆本仓库
git clone https://github.com/littlecabbage/design-pattern.git
cd design-pattern

# 2. 安装依赖
npm install

# 3. 启动本地开发服务
npm run dev
# 浏览器打开 http://localhost:5173

# 4. 构建生产包 (将生成 dist/ 目录)
npm run build
```

---

## 📁 目录结构说明

```text
design-pattern/
├── .github/workflows/deploy.yml          # GitHub Pages CI/CD 自动化流水线
├── design-pattern-html/                  # 独立单文件 HTML 教学课件库
│   └── 01-creational/
│       ├── 01-factory-method-pattern.html
│       └── 02-abstract-factory-pattern.html
├── public/                               # 静态资源与 HTML 镜像
├── src/                                  # React 交互式教学导航大厅源码
│   ├── components/                       # 可复用架构教学组件库
│   ├── App.tsx                           # 主站导航大厅页面
│   └── main.tsx                          # React 入口
├── index.html                            # Web App 入口文件
├── package.json
└── vite.config.ts                        # Vite 配置文件 (已适配 GitHub Pages 相对路径)
```

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star ⭐️、Fork 与提交 Issue 参与共建！
