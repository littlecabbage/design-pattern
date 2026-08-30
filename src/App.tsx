import React from 'react';
import { Navbar, ProgressBar } from './components/Navbar';
import { TermBadge } from './components/TermBadge';
import { CodeBlock } from './components/CodeBlock';
import { UmlClassDiagram } from './components/UmlClassDiagram';
import { UmlSequenceDiagram } from './components/UmlSequenceDiagram';
import { RoleBentoGrid } from './components/RoleBentoGrid';
import { ProjectCodeViewer } from './components/ProjectCodeViewer';
import { InteractiveAgentLab } from './components/InteractiveAgentLab';
import { QuizCard } from './components/QuizCard';
import { GlossarySection } from './components/GlossarySection';
import {
  Lightbulb,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const App: React.FC = () => {
  // 糟糕的反模式代码 (Python)
  const antiPatternPython = `# ❌ 错误示范：把所有 Agent 的繁琐构建逻辑全部塞在业务调度中心
class AgentDispatcher:
    def dispatch_task(self, agent_type: str, task_prompt: str):
        # 痛点 1：业务逻辑与具体的 Agent 创建细节强耦合
        # 痛点 2：每次新增一种 Agent，都必须打开这个核心文件修改 if-else
        if agent_type == "code":
            # 初始化 REPL 工具、加载 system prompt、配置 API Key、设定上下文窗口...
            agent = CodeAgent(model="gpt-4o", sandbox_port=8080, timeout=30)
        elif agent_type == "research":
            # 初始化向量数据库、配置搜索引擎 API、加载研报模板...
            agent = ResearchAgent(model="gemini-1.5-pro", vector_db="milvus", top_k=5)
        elif agent_type == "data":
            # 初始化 DuckDB 连接、注入 Pandas 上下文...
            agent = DataAnalystAgent(model="claude-3-7-sonnet", enable_charts=True)
        else:
            raise ValueError(f"Unknown agent type: {agent_type}")
            
        return agent.execute(task_prompt)`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* 顶部进度条 */}
      <ProgressBar />

      {/* 导航栏 */}
      <Navbar />

      {/* 页面主容器 */}
      <main style={{ maxWidth: '1140px', margin: '0 auto', padding: '36px 20px 100px' }}>
        
        {/* HERO 区域 */}
        <section style={{ textAlign: 'center', padding: '24px 0 36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>面向架构进阶的现代化交互课程 · Python 3.11+ 生产级规范</span>
          </div>

          <h1
            style={{
              fontSize: '38px',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#0f172a',
              lineHeight: 1.25,
              marginBottom: '16px',
            }}
          >
            深入浅出：
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              工厂方法模式 (Factory Method)
            </span>
          </h1>

          <p style={{ fontSize: '16px', color: '#475569', maxWidth: '760px', margin: '0 auto 28px', lineHeight: 1.85, textAlign: 'left' }}>
            基于现代化
            <TermBadge
              term="AI Agent (智能体)"
              fullName="AI Agent (人工智能智能体)"
              definition="由大语言模型作为大脑驱动，具备自主感知、记忆规划与工具调用能力的软件实体。"
              analogy="如果你不理解，你就理解为「招聘了一个懂电脑的虚拟员工」：你给它一个目标，它自己上网查资料、写代码替你搞定。"
            />
            <span className="term-inline-note">*(💡 注：由大模型驱动的自动化实体。如果你不理解，你就理解为「招聘了一个懂电脑的虚拟员工」)*</span>
            系统的真实架构演进，带你跨越面向对象
            <TermBadge
              term="抽象类"
              fullName="Abstract Class (抽象类)"
              definition="包含抽象方法的基类，只制定规范不能直接 new 实例化。"
              analogy="如果你不理解，你就理解为「一张盖了章的半成品汽车图纸」：它规定了车必须有方向盘，但不能直接当真车开上路。"
            />
            <span className="term-inline-note">*(💡 注：包含规范但未完全完工的基类。如果你不理解，你就理解为「一张盖了章的半成品汽车图纸，不能直接当真车开上路」)*</span>
            、
            <TermBadge
              term="接口"
              fullName="Interface (接口)"
              definition="纯粹的方法规范声明契约，不含具体实现代码。"
              analogy="如果你不理解，你就理解为「墙上的五孔电源插座」：只要插头符合标准就能通电，不管插的是电视还是电饭煲。"
            />
            <span className="term-inline-note">*(💡 注：纯规范协议。如果你不理解，你就理解为「墙上的五孔电源插座标准，只要插头合规就能通电」)*</span>
            与
            <TermBadge
              term="UML 建模语言"
              fullName="Unified Modeling Language (统一建模语言)"
              definition="面向对象软件工程中用于可视化系统结构与时序交互的通用蓝图语言。"
              analogy="如果你不理解，你就理解为「建筑施工蓝图」：所有工程师看一眼符号就知道哪里是承重墙、哪里是管道。"
            />
            <span className="term-inline-note">*(💡 注：软件架构图示语言。如果你不理解，你就理解为「建筑工程施工总图纸」)*</span>
            的认知阶梯。
          </p>

          {/* 学习路径导航卡片 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '12px',
              textAlign: 'left',
            }}
          >
            {[
              { num: 'Step 01', name: '痛点起因与业务场景', href: '#section-intro' },
              { num: 'Step 02', name: 'UML 符号速成指南', href: '#section-uml' },
              { num: 'Step 03', name: '四大角色与分步类图', href: '#section-core' },
              { num: 'Step 04', name: 'Python工程代码与时序', href: '#section-code' },
              { num: 'Step 05', name: '动态仿真实验室', href: '#section-lab' },
              { num: 'Step 06', name: '知识巩固自测', href: '#section-quiz' },
            ].map((step) => (
              <a
                key={step.num}
                href={step.href}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, color: '#4f46e5', marginBottom: '4px' }}>
                  {step.num}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  {step.name}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 第 1 节：直觉认知与痛点 */}
        <section id="section-intro" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                01
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                直觉认知：从“手工捏 Agent”到“标准化工厂”
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '18px', maxWidth: '75ch', lineHeight: 1.75 }}>
              任何设计模式都不是为了炫技，而是为了解决业务演进过程中随之而来的<strong>代码腐化</strong>与<strong>高耦合痛点</strong>。
            </p>

            <div
              style={{
                backgroundColor: '#eef2ff',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                padding: '16px 20px',
                margin: '18px 0',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                fontSize: '14px',
                color: '#312e81',
              }}
            >
              <Lightbulb size={20} color="#4f46e5" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '4px' }}>什么是 GoF 设计模式？</h4>
                <p style={{ lineHeight: 1.75 }}>
                  <TermBadge
                    term="GoF (四人帮)"
                    fullName="Gang of Four (四位计算机学者)"
                    definition="1994 年合著《设计模式》总结了 23 个经典招式。"
                    analogy="如果你不理解，你就理解为「总结武林秘籍的四大宗师」：把无数程序员踩坑总结出来的 23 套盖楼套路编成了经典秘籍。"
                  />
                  <span className="term-inline-note">*(💡 注：1994 年总结出 23 个经典设计模式的计算机学者宗师)*</span>
                  将模式分为创建型、结构型与行为型。<strong>工厂方法 (Factory Method)</strong> 是创建型模式的核心：
                  <span className="term-inline-note" style={{ display: 'block', marginTop: '6px' }}>
                    *(💡 注：工厂方法是把创建对象的具体动作推迟到子类。如果你不理解，你就理解为「总公司把制造工序外包给专业代工厂」)*
                  </span>
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '16.5px', fontWeight: 700, marginTop: '24px', marginBottom: '10px' }}>
              业务场景：多智能体调度集群 (Multi-Agent Swarm)
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '14px', maxWidth: '75ch', lineHeight: 1.7 }}>
              假设我们在构建一个多 Agent 系统，平台需要动态调度三种不同特性的智能体：
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: 1.85, marginBottom: '20px' }}>
              <li>
                <strong>CodeAgent (代码智能体)</strong>：配置 Claude 3.7 / GPT-4o 模型，绑定
                <TermBadge
                  term="REPL 环境"
                  fullName="Read-Eval-Print Loop"
                  definition="交互式编程求值环境，可实时执行 Python 或 Bash 脚本"
                  analogy="如果你不理解，你就理解为「程序员的草稿演算本」：写一行代码马上看到运行结果，不用整套软件编译打包。"
                />
                <span className="term-inline-note">*(💡 注：交互式求值环境。如果你不理解，你就理解为「程序员的草稿演算本」)*</span>
                ，需要挂载语法树沙箱。
              </li>
              <li>
                <strong>ResearchAgent (研报智能体)</strong>：配置长文本模型，挂载搜索引擎与
                <TermBadge
                  term="RAG 知识库"
                  fullName="Retrieval-Augmented Generation"
                  definition="检索增强生成，通过向量数据库检索私有文档增强 LLM 准确度"
                  analogy="如果你不理解，你就理解为「带小抄进考场开卷考试」：大模型遇到专业问题先翻内部手册再作答。"
                />
                <span className="term-inline-note">*(💡 注：检索增强生成。如果你不理解，你就理解为「带内部手册进考场开卷考试」)*</span>
                。
              </li>
              <li><strong>DataAnalystAgent (数据分析智能体)</strong>：配置 DuckDB 内存数据库与图表生成引擎。</li>
            </ul>

            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#e11d48', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> ❌ 初学者的朴素硬编码写法 (Anti-Pattern)
            </h4>

            <CodeBlock
              snippets={[
                {
                  language: 'python',
                  filename: 'anti_pattern_dispatcher.py',
                  code: antiPatternPython,
                  badge: '❌ 强耦合反模式',
                  badgeType: 'danger',
                },
              ]}
            />

            <div
              style={{
                backgroundColor: '#fffbeb',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '12px',
                padding: '16px 20px',
                margin: '18px 0',
                fontSize: '13.5px',
                color: '#78350f',
                lineHeight: 1.75,
              }}
            >
              <h4 style={{ fontWeight: 700, color: '#b45309', marginBottom: '6px' }}>这种硬编码写法为什么极度危险？</h4>
              <p>
                1. 违反 <TermBadge term="开闭原则 (OCP)" fullName="Open-Closed Principle" definition="对扩展开放，对修改关闭。" analogy="如果你不理解，你就理解为「手机装新 App」：想要新功能直接下载即可，绝不需要用螺丝刀拆开手机主板改线路。" />
                <span className="term-inline-note">*(💡 注：对扩展开放，对修改关闭。如果你不理解，你就理解为「手机装新 App 不需要拆开主板改线路」)*</span>
                ：明天要上线 <code>VisionAgent (视觉智能体)</code>，你必须打开核心调度文件去修改 <code>if-else</code> 分支，极易引发线上事故！<br />
                2. 违反 <TermBadge term="单一职责原则 (SRP)" fullName="Single Responsibility Principle" definition="一个类应该仅有一个引起它变化的原因。" analogy="如果你不理解，你就理解为「专人专事」：厨师只管炒菜，别让他既炒菜又当服务员还去通下水道。" />
                <span className="term-inline-note">*(💡 注：一个类只管一件事。如果你不理解，你就理解为「厨师专心炒菜，别兼职当服务员还修水管」)*</span>
                ：调度中心既要管“分发派单”，又要精通每种 Agent 极其琐碎的“装配细节”。
              </p>
            </div>
          </div>
        </section>

        {/* 第 2 节：UML 极简速成 */}
        <section id="section-uml" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                02
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                UML 极简入门：看懂软件架构图的设计语言
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '18px', maxWidth: '75ch', lineHeight: 1.75 }}>
              看懂设计模式必须掌握行业通用的蓝图标准：<strong>UML (统一建模语言)</strong>。
              初学者只需掌握<strong>类图的 3 层矩形框</strong>与<strong>3 种核心连线</strong>：
            </p>

            {/* 类图矩形框拆解 */}
            <div
              style={{
                backgroundColor: '#fafbfc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                margin: '18px 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
                alignItems: 'center',
              }}
            >
              <div style={{ border: '2px solid #4f46e5', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ backgroundColor: '#eef2ff', padding: '8px', textAlign: 'center', fontWeight: 700, borderBottom: '1px solid #c7d2fe', fontSize: '13px', color: '#3730a3' }}>
                  &lt;&lt;interface&gt;&gt;<br />
                  <em>Agent</em>
                </div>
                <div style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#475569' }}>
                  + name: String<br />
                  - modelId: String
                </div>
                <div style={{ padding: '10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#475569' }}>
                  + execute(task: String): String<br />
                  # initTools(): void
                </div>
              </div>

              <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.8 }}>
                <p><strong>第一层 (类名区)：</strong>斜体字或带有 <code>&lt;&lt;interface&gt;&gt;</code> 表示抽象类或接口（规范图纸）。</p>
                <p><strong>第二层 (属性区)：</strong>格式为 <code>可见性 属性名: 类型</code>（内部存储变量）。</p>
                <p><strong>第三层 (方法区)：</strong>格式为 <code>可见性 方法名(参数列表): 返回值类型</code>（拥有的操作技能）。</p>
                <p style={{ marginTop: '8px' }}>
                  <strong>可见性符号说明：</strong>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#4f46e5', fontWeight: 700 }}>+</code> Public (公开) &nbsp;|&nbsp;
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#4f46e5', fontWeight: 700 }}>-</code> Private (私密) &nbsp;|&nbsp;
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#4f46e5', fontWeight: 700 }}>#</code> Protected (保护)
                </p>
              </div>
            </div>

            {/* 3 种连线对照表 */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '24px 0 12px' }}>
              🔗 模式中最核心的 3 种 UML 连线符号：
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', margin: '10px 0' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>关系名称</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>UML 符号与线条</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>通俗大白话比喻</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Agent 案例中的体现</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontWeight: 700 }}>实现 (Realization)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#4f46e5', fontWeight: 700 }}>╌╌╌╌▷ (虚线+空心三角)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>照着标准施工造实物</strong>（插头符合插座标准）</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><code>CodeAgent</code> 实现了 <code>Agent</code> 接口</td>
                  </tr>
                  <tr style={{ backgroundColor: '#fafbfc' }}>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontWeight: 700 }}>泛化 (Generalization)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#4f46e5', fontWeight: 700 }}>──────▷ (实线+空心三角)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>儿子继承老爸的家业</strong>（子类继承父类方法）</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><code>CodeAgentFactory</code> 继承了 <code>AgentFactory</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontWeight: 700 }}>依赖创建 (Dependency)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#4f46e5', fontWeight: 700 }}>╌╌╌╌&gt; (虚线+开放箭头)</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>工厂造出了一件商品</strong>（临时实例化并交付）</td>
                    <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><code>CodeAgentFactory</code> 实例化了 <code>CodeAgent</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 第 3 节：四大核心角色与 UML 类图 (5 步分步演练) */}
        <section id="section-core" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                03
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                工厂方法模式的四大核心角色与分步类图
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '18px', maxWidth: '75ch', lineHeight: 1.75 }}>
              工厂方法模式将整个系统的对象创建结构清晰拆分为“生产线”与“产品”两大层级。点击下方卡片查看每一个角色的通俗大白话比喻：
            </p>

            {/* 角色卡片 Bento 探索组件 */}
            <RoleBentoGrid />

            {/* UML 5 步分步类图构建组件 */}
            <UmlClassDiagram />
          </div>
        </section>

        {/* 第 4 节：代码实战与时序图 (按照实际写代码过程展示工程文件) */}
        <section id="section-code" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                04
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                代码实战：AI Agent 系统的工程文件与开发全过程
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '14px', maxWidth: '75ch', lineHeight: 1.75 }}>
              在真实生产环境中，代码绝不是全部堆砌在一个文件里。我们按照<strong>实际开发时的先后编码顺序 (Step 01 → Step 07)</strong> 分离为规范的模块结构：
            </p>

            {/* 多文件工程级代码查看器 (按开发顺序) */}
            <ProjectCodeViewer />

            {/* UML 7 步动态时序分步教学组件 */}
            <UmlSequenceDiagram />
          </div>
        </section>

        {/* 第 5 节：交互式智能体工坊实验室 */}
        <section id="section-lab" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                05
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                架构实验室：实时体验多态工厂的动态扩展
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '14px', maxWidth: '75ch', lineHeight: 1.75 }}>
              动手试试！在下方的仿真实验室中，你可以分发代码任务、研报任务，甚至在不改动已有调度引擎的情况下<strong>动态挂载全新的视觉智能体工厂 (VisionAgentFactory)</strong>：
            </p>

            <InteractiveAgentLab />

            {/* 设计原则深度总结 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
                marginTop: '28px',
              }}
            >
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  1. 开闭原则 (OCP)
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  新增智能体只需新增具体类与工厂类文件，现有核心调度逻辑零改动，彻底杜绝回归测试风险。
                </p>
                <div className="term-inline-note" style={{ marginTop: '6px' }}>
                  *(💡 注：想要新功能就下载新 App，绝不拆开主板改线路)*
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #4f46e5', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  2. 单一职责原则 (SRP)
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  每个具体工厂只专精自身 Agent 的复杂装配细节（沙箱、API-Key、提示词），职责清晰互不干扰。
                </p>
                <div className="term-inline-note" style={{ marginTop: '6px' }}>
                  *(💡 注：厨师专心炒菜，别让厨师兼职当收银员还去通下水道)*
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #06b6d4', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  3. 依赖倒置原则 (DIP)
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  客户端永远只与 <code>AgentFactory</code> 和 <code>Agent</code> 抽象打交道，高层与底层全部面向接口编程。
                </p>
                <div className="term-inline-note" style={{ marginTop: '6px' }}>
                  *(💡 注：所有电器都认五孔插座，绝不把电线焊死在发电厂)*
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第 6 节：知识巩固与即学即测 */}
        <section id="section-quiz" className="bezel-card">
          <div className="bezel-core">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                06
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
                即学即测：3 分钟架构知识自测
              </h2>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '14px', maxWidth: '75ch' }}>
              检验你的理解程度！点击选项获取即时解析与彩带反馈：
            </p>

            <QuizCard />
          </div>
        </section>

        {/* 附录：初学者概念大白话速查字典 */}
        <section id="section-glossary">
          <GlossarySection />
        </section>

        {/* 底部祝贺卡片 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)',
            border: '1px solid #c7d2fe',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center',
            marginTop: '36px',
          }}
        >
          <Sparkles size={26} color="#4f46e5" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#1e1b4b', marginBottom: '6px' }}>
            恭喜完成工厂方法模式的现代化探索！
          </h3>
          <p style={{ color: '#4338ca', maxWidth: '640px', margin: '0 auto', fontSize: '14px', lineHeight: 1.6 }}>
            核心心法：<strong>“把容易变化的实例化细节推迟到具体工厂子类中实现，让业务核心系统永远面向稳定的抽象契约编程。”</strong>
          </p>
        </div>

      </main>

      {/* 页脚 */}
      <footer style={{ textAlign: 'center', padding: '50px 0 30px', color: '#94a3b8', fontSize: '13px', borderTop: '1px solid #e2e8f0' }}>
        <p>Design Patterns Interactive Masterclass · Python 3.11+ Edition</p>
        <p style={{ marginTop: '4px', fontSize: '12px' }}>遵循面向对象架构设计原则 · 标准 UML 2.5 规范建模</p>
      </footer>
    </div>
  );
};

export default App;
