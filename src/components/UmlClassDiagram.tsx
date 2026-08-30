import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Layers, Sparkles, Code, ChevronRight, ChevronLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

interface ClassDiagramStep {
  step: number;
  title: string;
  focusRole: string;
  focusRoleEn: string;
  activeElements: string[];
  keyConcept: string;
  umlNotation: string;
  plainAnalogy: string;
}

export const UmlClassDiagram: React.FC = () => {
  const [viewMode, setViewMode] = useState<'interactive' | 'mermaid'>('interactive');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const mermaidRef = useRef<HTMLDivElement>(null);

  const steps: ClassDiagramStep[] = [
    {
      step: 1,
      title: '第一步：定义抽象产品 (Abstract Product)',
      focusRole: '抽象产品接口 (Agent)',
      focusRoleEn: 'Abstract Product',
      activeElements: ['Agent'],
      keyConcept: '面向对象设计第一步：提炼系统公共能力。所有智能体都必须能执行任务，因此先定义统一的抽象接口 Agent 与抽象方法 execute_task()*。',
      umlNotation: '类名区带有 <<interface / abstract>> 且类名为斜体；方法名带 * 表示为纯虚/抽象方法，自身不包含实现。',
      plainAnalogy: '抽象产品是全套系统的顶层规范。如果你不理解，你就理解为：一张国家规定的「标准汽车驾驶台图纸」——规定了车必须有方向盘和刹车踏板，但不能直接当真车开上路。',
    },
    {
      step: 2,
      title: '第二步：实现具体产品 (Concrete Products)',
      focusRole: '具体智能体 (CodeAgent & ResearchAgent)',
      focusRoleEn: 'Concrete Products',
      activeElements: ['CodeAgent', 'ResearchAgent', 'Agent', 'rel-product-realize'],
      keyConcept: '根据业务场景各自实现具体智能体，封装特有的私有状态（如代码沙箱端口 sandbox_port、向量知识库地址 vector_db_url）。',
      umlNotation: '实现关系 (Realization)：使用带空心三角形的虚线 (╌╌▷) 从具体类指向抽象接口，表示具体类实现了接口制定的所有方法。',
      plainAnalogy: '具体产品是真正出厂的实物真车。如果你不理解，你就理解为：特斯拉纯电车与保时捷燃油车——内部引擎结构各异，但方向盘和刹车都符合国家标准，驾驶员都能开。',
    },
    {
      step: 3,
      title: '第三步：声明抽象工厂 (Abstract Creator)',
      focusRole: '抽象工坊基类 (AgentFactory)',
      focusRoleEn: 'Abstract Creator',
      activeElements: ['AgentFactory', 'Agent', 'rel-factory-method'],
      keyConcept: '模式核心转折点！为了避免业务代码与具体 Agent 绑定，我们定义抽象工厂 AgentFactory，声明核心工厂方法 create_agent()* : Agent。工厂方法返回顶层抽象 Agent，还可以附带通用的 run_agent_workflow() 工作流模板。',
      umlNotation: '依赖关系 (Dependency)：工厂类方法返回类型为 Agent，在类图中工厂与产品之间存在抽象依赖。',
      plainAnalogy: '抽象工厂是生产管理的总指挥部。如果你不理解，你就理解为：汽车制造集团总部的「标准管理制度」——它规定每个加盟分厂都必须拥有「造车流水线」和「出厂质检流程」，但总部自己不拧螺丝。',
    },
    {
      step: 4,
      title: '第四步：扩展具体工厂 (Concrete Creators)',
      focusRole: '具体工坊子类 (CodeAgentFactory & ResearchAgentFactory)',
      focusRoleEn: 'Concrete Creators',
      activeElements: ['AgentFactory', 'CodeAgentFactory', 'ResearchAgentFactory', 'rel-factory-inherit'],
      keyConcept: '针对每一种 Agent 创建专属的具体工厂，重写父类 create_agent() 方法，在自己的私有领地内完成复杂的对象装配（加载模型、配置沙箱、注入 API-Key）。',
      umlNotation: '泛化/继承关系 (Generalization)：使用带空心三角形的实线 (──▷) 从具体工厂指向抽象工厂基类，表示子类继承了父类的通用管线。',
      plainAnalogy: '具体工厂是真正开工拧螺丝的车间。如果你不理解，你就理解为：专门造纯电车的上海超级工厂或造超跑的斯图加特工厂——各自分管不同车型的组装工序。',
    },
    {
      step: 5,
      title: '第五步：建立创建依赖与全景闭环',
      focusRole: '全景四大角色闭环 (Full Architecture)',
      focusRoleEn: 'Full Architecture Panorama',
      activeElements: [
        'Agent',
        'CodeAgent',
        'ResearchAgent',
        'AgentFactory',
        'CodeAgentFactory',
        'ResearchAgentFactory',
        'rel-product-realize',
        'rel-factory-inherit',
        'rel-factory-creates',
      ],
      keyConcept: '完整架构大闭环！具体工厂负责实例化具体产品 (Creates)，而客户端自始至终只依赖左上角的 AgentFactory 与右上角的 Agent 抽象。新增智能体时只需新增一对具体类，完美符合 OCP 开闭原则！',
      umlNotation: '创建依赖 (Create Dependency)：从具体工厂指向具体产品的虚线开放箭头 (╌╌>)，表示工厂在其方法中 new 出了该产品。',
      plainAnalogy: '全景架构大解耦。如果你不理解，你就理解为：总公司和驾驶员都只认国家标准插座和方向盘，具体工厂按需造出不同车型，互相绝不干涉。',
    },
  ];

  // 键盘左右方向键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => Math.min(5, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mermaidCode = `classDiagram
    direction TB

    class Agent {
        <<interface>>
        +String name
        +String modelName
        +execute_task(String task)* String
    }

    class CodeAgent {
        -int sandbox_port
        -bool allow_exec
        +execute_task(String task) String
        -compile_and_run()
    }

    class ResearchAgent {
        -String vector_db_url
        -int search_depth
        +execute_task(String task) String
        -search_knowledge_base()
    }

    Agent <|.. CodeAgent : Realization
    Agent <|.. ResearchAgent : Realization

    class AgentFactory {
        <<abstract>>
        +create_agent()* Agent
        +run_agent_workflow(String task) String
    }

    class CodeAgentFactory {
        -String custom_model
        +create_agent() Agent
    }

    class ResearchAgentFactory {
        -String db_endpoint
        +create_agent() Agent
    }

    AgentFactory <|-- CodeAgentFactory : Generalization
    AgentFactory <|-- ResearchAgentFactory : Generalization

    CodeAgentFactory ..> CodeAgent : Creates
    ResearchAgentFactory ..> ResearchAgent : Creates`;

  useEffect(() => {
    if (viewMode === 'mermaid' && mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#eef2ff',
          primaryTextColor: '#1e1b4b',
          primaryBorderColor: '#6366f1',
          lineColor: '#64748b',
          secondaryColor: '#fef3c7',
          tertiaryColor: '#ecfdf5',
          fontFamily: 'Plus Jakarta Sans, Noto Sans SC, sans-serif',
        },
      });

      mermaid.render('mermaid-class-graph', mermaidCode).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      }).catch((err) => {
        console.error('Mermaid render error:', err);
      });
    }
  }, [viewMode]);

  const curr = steps[currentStep - 1];

  const isElemActive = (id: string) => curr.activeElements.includes(id);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        margin: '24px 0',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* 顶部标题与模式切换 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
          <Layers size={18} color="#4f46e5" />
          <span>UML 类图分步构建教学 (Step-by-Step Class Architecture)</span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setViewMode('interactive')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              backgroundColor: viewMode === 'interactive' ? '#4f46e5' : '#f1f5f9',
              borderColor: viewMode === 'interactive' ? '#4f46e5' : '#e2e8f0',
              color: viewMode === 'interactive' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
            }}
          >
            <BookOpen size={13} />
            <span>📖 5 步分步演练 (推荐)</span>
          </button>
          <button
            onClick={() => setViewMode('mermaid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              backgroundColor: viewMode === 'mermaid' ? '#4f46e5' : '#f1f5f9',
              borderColor: viewMode === 'mermaid' ? '#4f46e5' : '#e2e8f0',
              color: viewMode === 'mermaid' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
            }}
          >
            <Code size={13} />
            <span>📊 Mermaid 原生渲染</span>
          </button>
        </div>
      </div>

      {viewMode === 'interactive' ? (
        <div>
          {/* 5 步顶部进度栏 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            {steps.map((s) => {
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  style={{
                    backgroundColor: isActive ? '#eef2ff' : isPast ? '#f8fafc' : '#ffffff',
                    border: '1.5px solid',
                    borderColor: isActive ? '#4f46e5' : isPast ? '#cbd5e1' : '#e2e8f0',
                    borderRadius: '10px',
                    padding: '8px 6px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#4f46e5' : isPast ? '#10b981' : '#f1f5f9',
                      color: isActive || isPast ? '#ffffff' : '#64748b',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isPast ? '✓' : s.step}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#4f46e5' : isPast ? '#475569' : '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                    }}
                  >
                    {s.title.split('：')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 分步教学控制工具栏 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px 18px',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
                disabled={currentStep === 1}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: currentStep === 1 ? '#cbd5e1' : '#1e293b',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <ChevronLeft size={16} /> 上一步 (←)
              </button>

              <button
                onClick={() => setCurrentStep((p) => (p >= 5 ? 1 : p + 1))}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                }}
              >
                <span>{currentStep === 5 ? '重新从第 1 步开始' : `下一步：第 ${currentStep + 1}/5 步 (→)`}</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#64748b' }}>
              💡 提示：按键盘 <kbd style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontFamily: 'monospace' }}>←</kbd> 或 <kbd style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontFamily: 'monospace' }}>→</kbd> 可直接切步
            </div>
          </div>

          {/* SVG 类图画布（支持分步高亮与关系连线动态显隐） */}
          <div style={{ overflowX: 'auto', textAlign: 'center', padding: '10px 0' }}>
            <svg
              viewBox="0 0 880 430"
              style={{ width: '100%', maxWidth: '880px', margin: '0 auto', display: 'block' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="shadow-class" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.06" />
                </filter>
                {/* 空心三角箭头 (用于实现与泛化) */}
                <marker id="arrow-triangle-hollow" markerWidth="14" markerHeight="14" refX="1" refY="7" orient="auto">
                  <polygon points="1 1, 13 7, 1 13" fill="#ffffff" stroke="#64748b" strokeWidth="1.8" />
                </marker>
                {/* 开放依赖箭头 */}
                <marker id="arrow-open-dependency" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
                  <path d="M 1 1 L 11 6 L 1 11" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
                </marker>
              </defs>

              {/* 1. 左上：抽象工厂 (AgentFactory) */}
              <g
                transform="translate(40, 20)"
                filter="url(#shadow-class)"
                opacity={isElemActive('AgentFactory') ? 1 : 0.18}
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <rect
                  width="250"
                  height="120"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep === 3 || currentStep === 5 ? '#f59e0b' : '#cbd5e1'}
                  strokeWidth={currentStep === 3 || currentStep === 5 ? '2.5' : '1.5'}
                />
                <path d="M0 0 H250 V34 H0 Z" fill="#fef3c7" clipPath="inset(0 0 0 0 round 10px 10px 0 0)" />
                <text x="125" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">&lt;&lt;abstract&gt;&gt;</text>
                <text x="125" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#78350f" fontStyle="italic">AgentFactory</text>
                <line x1="0" y1="34" x2="250" y2="34" stroke="#fde68a" strokeWidth="1" />
                <text x="14" y="54" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#64748b">+ create_agent()* : Agent</text>
                <line x1="0" y1="64" x2="250" y2="64" stroke="#f1f5f9" strokeWidth="1" />
                <text x="14" y="84" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#64748b">+ run_agent_workflow(task) : str</text>
                <text x="14" y="104" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#94a3b8"># audit_security(agent) : bool</text>
              </g>

              {/* 2. 右上：抽象产品 (Agent) */}
              <g
                transform="translate(590, 20)"
                filter="url(#shadow-class)"
                opacity={isElemActive('Agent') ? 1 : 0.18}
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <rect
                  width="250"
                  height="120"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep === 1 || currentStep === 5 ? '#6366f1' : '#cbd5e1'}
                  strokeWidth={currentStep === 1 || currentStep === 5 ? '2.5' : '1.5'}
                />
                <path d="M0 0 H250 V34 H0 Z" fill="#eef2ff" clipPath="inset(0 0 0 0 round 10px 10px 0 0)" />
                <text x="125" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4f46e5">&lt;&lt;interface / abstract&gt;&gt;</text>
                <text x="125" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#312e81" fontStyle="italic">Agent</text>
                <line x1="0" y1="34" x2="250" y2="34" stroke="#c7d2fe" strokeWidth="1" />
                <text x="14" y="54" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#64748b">+ name: str</text>
                <text x="14" y="70" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#64748b">+ model_name: str</text>
                <line x1="0" y1="78" x2="250" y2="78" stroke="#f1f5f9" strokeWidth="1" />
                <text x="14" y="98" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#4f46e5" fontWeight="600">+ execute_task(task)* : str</text>
              </g>

              {/* 3. 左下 1：具体工厂 (CodeAgentFactory) */}
              <g
                transform="translate(40, 270)"
                filter="url(#shadow-class)"
                opacity={isElemActive('CodeAgentFactory') ? 1 : 0.18}
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <rect
                  width="250"
                  height="100"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep === 4 || currentStep === 5 ? '#ef4444' : '#cbd5e1'}
                  strokeWidth={currentStep === 4 || currentStep === 5 ? '2.5' : '1.5'}
                />
                <path d="M0 0 H250 V30 H0 Z" fill="#fee2e2" clipPath="inset(0 0 0 0 round 10px 10px 0 0)" />
                <text x="125" y="21" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">CodeAgentFactory</text>
                <line x1="0" y1="30" x2="250" y2="30" stroke="#fecaca" strokeWidth="1" />
                <text x="14" y="50" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#64748b">- custom_model: str</text>
                <line x1="0" y1="58" x2="250" y2="58" stroke="#f1f5f9" strokeWidth="1" />
                <text x="14" y="78" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#0f172a" fontWeight="600">+ create_agent() : CodeAgent</text>
              </g>

              {/* 4. 右下 1：具体产品 (CodeAgent) */}
              <g
                transform="translate(590, 270)"
                filter="url(#shadow-class)"
                opacity={isElemActive('CodeAgent') ? 1 : 0.18}
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <rect
                  width="250"
                  height="100"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep === 2 || currentStep === 5 ? '#10b981' : '#cbd5e1'}
                  strokeWidth={currentStep === 2 || currentStep === 5 ? '2.5' : '1.5'}
                />
                <path d="M0 0 H250 V30 H0 Z" fill="#dcfce7" clipPath="inset(0 0 0 0 round 10px 10px 0 0)" />
                <text x="125" y="21" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">CodeAgent</text>
                <line x1="0" y1="30" x2="250" y2="30" stroke="#bbf7d0" strokeWidth="1" />
                <text x="14" y="48" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#64748b">- sandbox_port: int</text>
                <line x1="0" y1="56" x2="250" y2="56" stroke="#f1f5f9" strokeWidth="1" />
                <text x="14" y="74" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fill="#0f172a" fontWeight="600">+ execute_task(task) : str</text>
                <text x="14" y="90" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="#64748b">- compile_and_run()</text>
              </g>

              {/* 连线 1：工厂方法依赖关系 (AgentFactory -> Agent) */}
              <g
                opacity={isElemActive('AgentFactory') && isElemActive('Agent') ? 1 : 0.15}
                style={{ transition: 'opacity 0.3s' }}
              >
                <line x1="290" y1="80" x2="590" y2="80" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="5,5" markerEnd="url(#arrow-open-dependency)" />
                <rect x="380" y="65" width="120" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                <text x="440" y="79" textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="600">&lt;&lt;returns&gt;&gt; Agent</text>
              </g>

              {/* 连线 2：具体产品实现抽象接口 (CodeAgent ╌╌▷ Agent) */}
              <g
                opacity={isElemActive('rel-product-realize') ? 1 : 0.15}
                style={{ transition: 'opacity 0.3s' }}
              >
                <line x1="715" y1="270" x2="715" y2="155" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5,5" markerEnd="url(#arrow-triangle-hollow)" />
                <rect x="725" y="195" width="100" height="20" rx="4" fill="#ffffff" stroke="#e2e8f0" />
                <text x="775" y="209" textAnchor="middle" fontSize="10" fill="#64748b">实现 (Realize)</text>
              </g>

              {/* 连线 3：具体工厂继承抽象基类 (CodeAgentFactory ──▷ AgentFactory) */}
              <g
                opacity={isElemActive('rel-factory-inherit') ? 1 : 0.15}
                style={{ transition: 'opacity 0.3s' }}
              >
                <line x1="165" y1="270" x2="165" y2="155" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#arrow-triangle-hollow)" />
                <rect x="75" y="195" width="85" height="20" rx="4" fill="#ffffff" stroke="#e2e8f0" />
                <text x="117" y="209" textAnchor="middle" fontSize="10" fill="#64748b">泛化 (Inherit)</text>
              </g>

              {/* 连线 4：具体工厂创建具体产品 (CodeAgentFactory ╌╌> CodeAgent) */}
              <g
                opacity={isElemActive('rel-factory-creates') ? 1 : 0.15}
                style={{ transition: 'opacity 0.3s' }}
              >
                <line x1="290" y1="320" x2="590" y2="320" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-open-dependency)" />
                <rect x="390" y="306" width="100" height="20" rx="4" fill="#ffffff" stroke="#bbf7d0" />
                <text x="440" y="320" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600">&lt;&lt;instantiates&gt;&gt;</text>
              </g>
            </svg>
          </div>

          {/* 专属分步教学卡片 */}
          <div
            style={{
              marginTop: '16px',
              padding: '20px 24px',
              borderRadius: '14px',
              backgroundColor: '#fafbfc',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* 步骤标题 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '13px',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Step {curr.step} / 5
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                  {curr.title}
                </h4>
              </div>

              <div style={{ fontSize: '12.5px', color: '#4f46e5', fontWeight: 700, backgroundColor: '#eef2ff', padding: '3px 10px', borderRadius: '6px', border: '1px solid #c7d2fe' }}>
                聚焦：{curr.focusRole}
              </div>
            </div>

            {/* 教学解析三要素 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '13px', lineHeight: 1.65 }}>
              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '4px' }}>
                  🎯 架构设计要点
                </div>
                <div style={{ color: '#334155' }}>{curr.keyConcept}</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#059669', marginBottom: '4px' }}>
                  📐 UML 图示符号规范
                </div>
                <div style={{ color: '#334155' }}>{curr.umlNotation}</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#d97706', marginBottom: '4px' }}>
                  🗣️ 初学者大白话理解
                </div>
                <div style={{ color: '#334155' }}>{curr.plainAnalogy}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={mermaidRef} style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', minHeight: '300px' }} />
      )}
    </div>
  );
};
