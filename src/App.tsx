import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  Box,
  ArrowRight,
  Search,
  BookOpen,
  Cpu,
  ShieldCheck,
  Code2,
  Workflow,
  Compass,
  ExternalLink,
  CheckCircle2,
  Clock,
  Flame,
  Zap,
} from 'lucide-react';

interface PatternItem {
  id: string;
  category: 'creational' | 'structural' | 'behavioral';
  categoryName: string;
  seq: string;
  name: string;
  nameEn: string;
  status: 'published' | 'coming_soon';
  difficulty: '入门' | '进阶' | '核心' | '高级';
  tag: string;
  summary: string;
  analogy: string;
  agentCase: string;
  url?: string;
}

const PATTERNS_DATA: PatternItem[] = [
  // 01 创建型模式 (Creational)
  {
    id: 'factory-method',
    category: 'creational',
    categoryName: '创建型模式',
    seq: '01',
    name: '工厂方法模式',
    nameEn: 'Factory Method Pattern',
    status: 'published',
    difficulty: '入门',
    tag: '多态创建 · 解耦生命周期',
    summary: '定义一个创建对象的接口，但让子类决定实例化哪一个类。把对象的创建与业务调度彻底解耦。',
    analogy: '集团总部的标准管理制度：规定每个分厂都必须具备造车流程，但由具体分厂自己装配纯电车或燃油车。',
    agentCase: 'CodeAgent (代码沙箱) 与 ResearchAgent (向量研报) 的动态生命周期流水线',
    url: './design-pattern-html/01-creational/01-factory-method-pattern.html',
  },
  {
    id: 'abstract-factory',
    category: 'creational',
    categoryName: '创建型模式',
    seq: '02',
    name: '抽象工厂模式',
    nameEn: 'Abstract Factory Pattern',
    status: 'published',
    difficulty: '进阶',
    tag: '产品族生态 · 杜绝混搭事故',
    summary: '提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。成套生产整套协同生态。',
    analogy: '品牌生态专营店：苹果官方旗舰店一次性提供 iPhone + Mac + Watch 全套原装协同设备。',
    agentCase: '本地涉密隔离栈 (Ollama + SQLite + Docker) vs 云端企业高并发栈 (OpenAI + Milvus + MicroVM)',
    url: './design-pattern-html/01-creational/02-abstract-factory-pattern.html',
  },
  {
    id: 'singleton',
    category: 'creational',
    categoryName: '创建型模式',
    seq: '03',
    name: '单例模式',
    nameEn: 'Singleton Pattern',
    status: 'published',
    difficulty: '入门',
    tag: '全局唯一 · 资源集中管控',
    summary: '保证一个类仅有一个实例，并提供一个访问它的全局访问点。避免重复初始化高开销资源。',
    analogy: '国家中央银行总行：全国统一发行货币与结算凭证，绝不允许各部门私自打印独立账本。',
    agentCase: 'Agent 集中式 Token 计量计费网关与全局 Embedding 缓存管理器',
    url: './design-pattern-html/01-creational/03-singleton-pattern.html',
  },
  {
    id: 'builder',
    category: 'creational',
    categoryName: '创建型模式',
    seq: '04',
    name: '建造者模式',
    nameEn: 'Builder Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '精细装配 · 链式流水线',
    summary: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。',
    analogy: '赛百味订制三明治：自选面包、肉类、蔬菜、酱料，一步一步精细化组装。',
    agentCase: '复杂 Agent 执行管线装配器 (Prompt 模板 + 工具集注入 + 记忆窗口 + 权限策略)',
  },
  {
    id: 'prototype',
    category: 'creational',
    categoryName: '创建型模式',
    seq: '05',
    name: '原型模式',
    nameEn: 'Prototype Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '克隆复制 · 状态快照分叉',
    summary: '用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象，节省昂贵的初始化开销。',
    analogy: '文档复印机：复印一份写好的合同模板，在此基础上填入不同客户的信息。',
    agentCase: '智能体思维链分支演化 (Tree-of-Thought) 的上下文环境状态深度克隆',
  },

  // 02 结构型模式 (Structural)
  {
    id: 'adapter',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '06',
    name: '适配器模式',
    nameEn: 'Adapter Pattern',
    status: 'published',
    difficulty: '入门',
    tag: '接口转换 · 消除协议鸿沟',
    summary: '将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
    analogy: '电源插头转换器：将国标三脚插头无缝转换插到英标插座上。',
    agentCase: '将传统 REST API / GraphQL 统一适配转换为 Agent MCP (Model Context Protocol) 标准工具',
    url: './design-pattern-html/02-structural/06-adapter-pattern.html',
  },
  {
    id: 'decorator',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '07',
    name: '装饰器模式',
    nameEn: 'Decorator Pattern',
    status: 'published',
    difficulty: '进阶',
    tag: '动态增强 · 避免子类膨胀',
    summary: '动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。',
    analogy: '给手机贴防窥膜并加装防摔壳：手机核心功能不变，但层层叠加了保护与特异能力。',
    agentCase: '为 Agent 核心调用链路无侵入叠加：流式输出增强、Token 预算限流、审计日志与安全脱敏',
    url: './design-pattern-html/02-structural/07-decorator-pattern.html',
  },
  {
    id: 'proxy',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '08',
    name: '代理模式',
    nameEn: 'Proxy Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '控制访问 · 虚拟延迟加载',
    summary: '为其他对象提供一种代理以控制对这个对象的访问。可实现延迟加载、权限校验与远程调用。',
    analogy: '明星经纪人：外界找明星商演必须先跟经纪人接洽，经纪人负责排期、合同初审和费用结算。',
    agentCase: '本地 Agent 对远程云端 GPU 推理集群的虚拟代理与断网智能降级',
  },
  {
    id: 'facade',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '09',
    name: '外观模式',
    nameEn: 'Facade Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '一键极简 · 隐藏底层复杂',
    summary: '为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。',
    analogy: '智能家居一键离家模式：按一个开关，自动熄灭所有灯光、关闭窗帘并启动安防。',
    agentCase: '向外部业务层提供 `agent.auto_solve(goal)` 门面，隐藏内部 Planning/RAG/Tools/Reflection 繁琐交互',
  },
  {
    id: 'bridge',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '10',
    name: '桥接模式',
    nameEn: 'Bridge Pattern',
    status: 'coming_soon',
    difficulty: '高级',
    tag: '双维度独立 · 抽象与实现分离',
    summary: '将抽象部分与它的实现部分分离，使它们都可以独立地变化。解决多维度多层组合爆炸。',
    analogy: '毛笔与墨水颜色：毛笔型号（大/中/小）与墨水颜色（红/蓝/黑）自由组合，无需生产 9 种专用笔。',
    agentCase: '智能体业务角色层 (开发/财务/医疗) 与 底层推理后端 (云端/私有化/端侧) 的独立解耦演进',
  },

  {
    id: 'composite',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '11',
    name: '组合模式',
    nameEn: 'Composite Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '树形结构 · 统一整体与部分',
    summary: '将对象组合成树形结构以表示"部分-整体"的层次结构，使客户端对单个对象和组合对象的使用具有一致性。',
    analogy: '公司组织架构图：无论是单个员工还是整个部门，都可以作为统一的"组织单元"来汇报工作。',
    agentCase: 'Multi-Agent 树状团队组织架构与任务递归分解执行',
  },
  {
    id: 'flyweight',
    category: 'structural',
    categoryName: '结构型模式',
    seq: '12',
    name: '享元模式',
    nameEn: 'Flyweight Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '细粒度共享 · 节约内存',
    summary: '运用共享技术有效地支持大量细粒度的对象，避免重复创建相同状态的对象浪费内存。',
    analogy: '公共图书馆藏书：全城读者共享同一本书，不必人手一本。',
    agentCase: '海量 Agent 会话共享预编译 Prompt 模板与只读 Embedding 权重矩阵',
  },

  // 03 行为型模式 (Behavioral)
  {
    id: 'strategy',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '13',
    name: '策略模式',
    nameEn: 'Strategy Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '算法独立 · 运行时自由切换',
    summary: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。本模式使得算法可独立于使用它的客户而变化。',
    analogy: '出行导航 APP：自驾、地铁、骑行三种不同路线规划算法，用户随时一键切换。',
    agentCase: 'Agent 推理搜索算法策略动态切换 (ReAct 单步决策 / Plan-and-Solve 批处理 / Tree-of-Thoughts 树搜索)',
  },
  {
    id: 'observer',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '14',
    name: '观察者模式',
    nameEn: 'Observer Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '事件发布订阅 · 状态松散联动',
    summary: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。',
    analogy: '微信公众号订阅：博主一旦发文，所有关注该号的粉丝都会立即收到推送。',
    agentCase: 'Multi-Agent 多智能体协作总线：Leader 任务分解事件自动广播给各 Worker 智能体监听执行',
  },
  {
    id: 'chain-of-responsibility',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '15',
    name: '责任链模式',
    nameEn: 'Chain of Responsibility Pattern',
    status: 'published',
    difficulty: '进阶',
    tag: '流水处理 · 动态责任传递',
    summary: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链传递请求。',
    analogy: '公司报销审批流程：组长审 1000 以内，部门总监审 5000 以内，超出则流转至财务总监。',
    agentCase: 'Agent 输入/输出多层安全防护网：Prompt 注入拦截 -> 政治敏感词过滤 -> 隐私 PII 脱敏 -> 代码执行前语法静态审查',
    url: './design-pattern-html/03-behavioral/15-chain-of-responsibility-pattern.html',
  },
  {
    id: 'state',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '16',
    name: '状态模式',
    nameEn: 'State Pattern',
    status: 'coming_soon',
    difficulty: '核心',
    tag: '状态驱动行为 · 消除臃肿分支',
    summary: '允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。',
    analogy: '自动售货机：处于“未投币”、“已投币”、“已出货”不同状态时，点击退币或选货按钮触发完全不同的行为。',
    agentCase: '自主 Agent 状态机循环：[IDLE 空闲] -> [PLANNING 规划] -> [EXECUTING 工具执行] -> [EVALUATING 自我反思纠错]',
  },
  {
    id: 'command',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '17',
    name: '命令模式',
    nameEn: 'Command Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '请求封装 · 撤销重试与异步排队',
    summary: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化，对请求排队或记录请求日志，并支持可撤销操作。',
    analogy: '餐厅点餐单：顾客将需求告诉服务员开出订单小票，订单可在后厨排队制作、挂起、转交或退菜撤销。',
    agentCase: 'Agent 工具调用 (Tool Call) 的序列化封装、执行历史记录、异步批处理队列与失败回滚 (Undo/Redo)',
  },
  {
    id: 'template-method',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '18',
    name: '模板方法模式',
    nameEn: 'Template Method Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '骨架约束 · 钩子定制',
    summary: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。',
    analogy: '标准冲饮流程：烧开水 -> 浸泡主料 -> 倒入杯中 -> 增添调料。主干顺序固定，子步骤自由定制咖啡或茶叶。',
    agentCase: 'Agent 标准决策管线骨架：[组装Prompt -> 大模型推理 -> 提取Action -> 执行观察 -> 终止判断]，子类定制各环节钩子',
  },
  {
    id: 'iterator',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '19',
    name: '迭代器模式',
    nameEn: 'Iterator Pattern',
    status: 'coming_soon',
    difficulty: '入门',
    tag: '统一遍历 · 屏蔽底层存储',
    summary: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。',
    analogy: '电视遥控器的换台键：用户只需按“下一台”持续浏览节目，无需理解电视内部频段信号的具体存储方式。',
    agentCase: '流式 Token 输出迭代生成器 (Streaming Iterator) 与多模态海量检索结果 (RAG 文档块) 的异步透明遍历',
  },
  {
    id: 'mediator',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '20',
    name: '中介者模式',
    nameEn: 'Mediator Pattern',
    status: 'coming_soon',
    difficulty: '核心',
    tag: '星型拓扑 · 消除网状死锁',
    summary: '用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，使其耦合松散，并可独立地改变它们之间的交互。',
    analogy: '民航机场调度塔台：所有进出港飞机只与塔台通信，绝不需要各飞机飞行员之间一对一无线电沟通防撞。',
    agentCase: '多智能体协作中枢 (Multi-Agent Hub)：Planner、Coder、Reviewer 之间零直接依赖，所有消息流转由 Hub 集中仲裁',
  },
  {
    id: 'memento',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '21',
    name: '备忘录模式',
    nameEn: 'Memento Pattern',
    status: 'coming_soon',
    difficulty: '进阶',
    tag: '状态快照 · 精准时光倒流',
    summary: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后将该对象恢复到原先保存的状态。',
    analogy: '单机游戏篝火存档点：在挑战恶魔 Boss 前按 F5 存档，战斗失败后一键读档回到保存时的健康满血状态。',
    agentCase: '智能体思维链长程推理的检查点 (Checkpoint) 快照系统：发生幻觉或死循环时随时回滚到上一步安全分支',
  },
  {
    id: 'visitor',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '22',
    name: '访问者模式',
    nameEn: 'Visitor Pattern',
    status: 'coming_soon',
    difficulty: '高级',
    tag: '双重分派 · 扩展算法无侵入',
    summary: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。',
    analogy: '海关安检通道：旅客身份与随身行李结构固定，安检机、缉毒犬、税务稽查官分别执行不同维度的专项检验。',
    agentCase: '针对 Agent 生成的代码抽象语法树 (AST) 与计划步骤树：无侵入挂载静态类型检查器、敏感词脱敏器与成本预估器',
  },
  {
    id: 'interpreter',
    category: 'behavioral',
    categoryName: '行为型模式',
    seq: '23',
    name: '解释器模式',
    nameEn: 'Interpreter Pattern',
    status: 'coming_soon',
    difficulty: '高级',
    tag: '语法定义 · 专属 DSL 引擎',
    summary: '给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。',
    analogy: '五线谱演奏家：阅读乐谱上的符号与节拍文法定义，实时将其解释为钢琴琴键的具体敲击力度与节奏。',
    agentCase: 'Agent 自定义工作流 DSL 指令解释器：解析如 "SEARCH query -> EXTRACT url -> SUMMARIZE" 的轻量声明式流水线',
  },
];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'creational' | 'structural' | 'behavioral'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 过滤数据
  const filteredPatterns = useMemo(() => {
    return PATTERNS_DATA.filter((item) => {
      const matchTab = activeTab === 'all' || item.category === activeTab;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.agentCase.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query);
      return matchTab && matchQuery;
    });
  }, [activeTab, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'var(--font-sans)' }}>
      {/* 顶部悬浮导航栏 */}
      <header style={{ position: 'sticky', top: '16px', zIndex: 900, maxWidth: '1200px', margin: '16px auto 0', padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '9999px',
            padding: '10px 24px',
            boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '15px' }}>
            <span style={{ background: '#4f46e5', color: '#ffffff', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>GoF 23</span>
            <span style={{ color: '#0f172a' }}>设计模式现代实战教学</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://github.com/littlecabbage/design-pattern"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#475569',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '9999px',
                background: '#f1f5f9',
                transition: 'all 0.2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub 源码</span>
            </a>
          </div>
        </div>
      </header>

      {/* 主视觉 Hero 区域 */}
      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '40px 20px 100px' }}>
        <section style={{ textAlign: 'center', padding: '30px 0 46px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>面向 AI Agent 时代工程师 · 彻底攻克面向对象架构与 UML 建模</span>
          </div>

          <h1
            style={{
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              lineHeight: 1.25,
              marginBottom: '20px',
            }}
          >
            深入浅出：
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GoF 23 种设计模式与 Agent 架构实战
            </span>
          </h1>

          <p style={{ fontSize: '17px', color: '#475569', maxWidth: '820px', margin: '0 auto 32px', lineHeight: 1.85 }}>
            告别死记硬背枯燥的动物画图案例！我们将业界经典 23 种设计模式与当今最前沿的
            <strong style={{ color: '#4f46e5', margin: '0 4px' }}>AI Agent (智能体) 基础设施生态</strong>
            深度结合，手把手带你理解工业级解耦思想、UML 2.5 架构图与 Python 3.11+ 生产级代码实现。
          </p>

          {/* 顶层 3 大核心支柱指示器 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', maxWidth: '880px', margin: '0 auto 40px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>01. 创建型 (Creational)</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>优雅创建对象，杜绝混搭与耦合</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>02. 结构型 (Structural)</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>灵活组合接口，实现弹性扩展</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Workflow size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>03. 行为型 (Behavioral)</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>精细协同流程，规范职责流转</div>
              </div>
            </div>
          </div>

          {/* 筛选与实时检索控制栏 */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* 分类 Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'all' ? '#4f46e5' : '#f1f5f9',
                  color: activeTab === 'all' ? '#ffffff' : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                全部模式 (23)
              </button>
              <button
                onClick={() => setActiveTab('creational')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'creational' ? '#4f46e5' : '#f1f5f9',
                  color: activeTab === 'creational' ? '#ffffff' : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                01. 创建型 (5)
              </button>
              <button
                onClick={() => setActiveTab('structural')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'structural' ? '#4f46e5' : '#f1f5f9',
                  color: activeTab === 'structural' ? '#ffffff' : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                02. 结构型 (7)
              </button>
              <button
                onClick={() => setActiveTab('behavioral')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'behavioral' ? '#4f46e5' : '#f1f5f9',
                  color: activeTab === 'behavioral' ? '#ffffff' : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                03. 行为型 (11)
              </button>
            </div>

            {/* 搜索框 */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="搜索模式名称、关键字或场景..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 14px 8px 36px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  background: '#fafbfc',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </section>

        {/* 模式矩阵 Bento Grid 卡片列表 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredPatterns.map((item) => {
            const isPublished = item.status === 'published';

            return (
              <div
                key={item.id}
                style={{
                  background: '#ffffff',
                  border: isPublished ? '1.5px solid #c7d2fe' : '1px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isPublished ? '0 8px 24px -4px rgba(79, 70, 229, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 顶部高亮条 (如果是已上线) */}
                {isPublished && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)' }} />
                )}

                <div>
                  {/* 头部 Badge 组 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 800,
                          color: isPublished ? '#4f46e5' : '#64748b',
                          background: isPublished ? '#eef2ff' : '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        #{item.seq}
                      </span>
                      <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>{item.categoryName}</span>
                    </div>

                    {isPublished ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>
                        <CheckCircle2 size={12} />
                        已上线·可交互
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '9999px' }}>
                        <Clock size={12} />
                        更新规划中
                      </span>
                    )}
                  </div>

                  {/* 模式标题 */}
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                    {item.name}
                  </h3>
                  <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: '#64748b', marginBottom: '12px' }}>
                    {item.nameEn}
                  </div>

                  {/* 特色标签 */}
                  <div style={{ display: 'inline-block', background: isPublished ? '#eef2ff' : '#f8fafc', color: isPublished ? '#4338ca' : '#475569', fontSize: '11.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '14px', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                    ✨ {item.tag}
                  </div>

                  {/* 摘要说明 */}
                  <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.65, marginBottom: '14px' }}>
                    {item.summary}
                  </p>

                  {/* AI Agent 实战案例 */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 12px', fontSize: '12.5px', color: '#475569', marginBottom: '18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Cpu size={13} color="#4f46e5" />
                      <span>Agent 落地案例</span>
                    </div>
                    <div style={{ lineHeight: 1.5 }}>{item.agentCase}</div>
                  </div>
                </div>

                {/* 底部跳转按钮 */}
                <div>
                  {isPublished && item.url ? (
                    <a
                      href={item.url}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        width: '100%',
                        padding: '10px 16px',
                        background: '#4f46e5',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span>进入交互式教学页面</span>
                      <ArrowRight size={15} />
                    </a>
                  ) : (
                    <button
                      disabled
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        width: '100%',
                        padding: '10px 16px',
                        background: '#f1f5f9',
                        color: '#94a3b8',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'not-allowed',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span>课程教案打磨中 敬请期待</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '50px 20px 30px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', background: '#ffffff' }}>
        <p style={{ fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
          GoF 23 Design Patterns Interactive Masterclass · AI Agent Architecture
        </p>
        <p>基于现代前端交互规范 · Python 3.11+ 生产级架构 · UML 2.5 可视化设计</p>
      </footer>
    </div>
  );
};

export default App;
