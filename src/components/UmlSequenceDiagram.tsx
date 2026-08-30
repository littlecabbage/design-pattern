import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Play, Pause, ChevronRight, ChevronLeft, RotateCcw, Clock, Code, Sparkles, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface StepDetail {
  step: number;
  phaseName: string;
  from: string;
  to: string;
  action: string;
  teachingPoint: string;
  mechanism: string;
  umlRule: string;
}

export const UmlSequenceDiagram: React.FC = () => {
  const [viewMode, setViewMode] = useState<'interactive' | 'mermaid'>('interactive');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 教学模式：默认手动分步，方便逐条讲解
  const mermaidRef = useRef<HTMLDivElement>(null);

  const steps: StepDetail[] = [
    {
      step: 1,
      phaseName: '客户端发起业务调用',
      from: 'Client (业务调度端)',
      to: 'CodeAgentFactory (具体工厂)',
      action: 'run_agent_workflow("编写代码任务")',
      teachingPoint: '面向抽象接口编程，客户端只持有抽象工厂 AgentFactory 的引用。',
      mechanism: '客户端完全不知道 CodeAgent 内部复杂的初始化参数（如沙箱端口、编译超时），只需向工厂提出业务诉求。',
      umlRule: '实线箭头 (->>)：代表同步消息调用 (Synchronous Message)，客户端发出指令后等待工厂返回。',
    },
    {
      step: 2,
      phaseName: '工厂方法多态触发',
      from: 'AgentFactory (基类管线)',
      to: 'CodeAgentFactory (子类实现)',
      action: 'create_agent() [多态工厂方法]',
      teachingPoint: '工厂基类中的业务模板将“实例化的决定权”下放给具体工厂子类。',
      mechanism: '这就是工厂方法模式的核心所在：基类工作流不写死任何具体类，而是调用抽象的 create_agent() 方法，由运行时子类去决定具体构造谁。',
      umlRule: '自反折线调用：对象调用自身的抽象或保护方法，触发多态分发。',
    },
    {
      step: 3,
      phaseName: '具体产品构造与装配',
      from: 'CodeAgentFactory',
      to: 'CodeAgent (具体产品)',
      action: 'new CodeAgent(sandbox_port=9090, allow_exec=True)',
      teachingPoint: '创建细节高度封装，所有复杂的依赖装配全部收敛在具体工厂内部。',
      mechanism: 'CodeAgentFactory 在这里读取代码沙箱端口、注入 API-Key 与提示词，完成复杂的对象装配过程。',
      umlRule: '创建消息：CodeAgent 对象被构造，其生命线上的激活条 (Activation Bar) 开始激活。',
    },
    {
      step: 4,
      phaseName: '产品实例交付工厂',
      from: 'CodeAgent',
      to: 'CodeAgentFactory',
      action: '返回具体 Agent 实例的引用',
      teachingPoint: '具体产品向上转型 (Upcasting) 为抽象 Agent 产品交付给通用流水线。',
      mechanism: '虽然返回的是 CodeAgent 实例，但工厂基类以统一的 Agent 抽象接口类型来接收，保证了流水线的通用性。',
      umlRule: '虚线箭头 (-->>)：返回消息 (Return Message)，表示实例构造完毕并将引用交给调用方。',
    },
    {
      step: 5,
      phaseName: '统一前置切面与业务执行',
      from: 'CodeAgentFactory (流水线)',
      to: 'CodeAgent (产品实体)',
      action: 'execute_task("编写代码任务")',
      teachingPoint: '工厂不仅仅只负责 new 对象，还能封装通用的生命周期切面（如安全审计、Token 检查）。',
      mechanism: '工厂在完成了统一的前置安全审计后，多态调用 Agent 的 execute_task() 方法，智能体在隔离沙箱中开始执行。',
      umlRule: '实线箭头：工厂向 Agent 发出业务执行指令，Agent 的激活条处于最高占用状态。',
    },
    {
      step: 6,
      phaseName: '产品返回执行成果',
      from: 'CodeAgent',
      to: 'CodeAgentFactory',
      action: '返回执行输出 ("Python 脚本执行成功, Exit: 0")',
      teachingPoint: '具体的业务运算在隔离产品中闭环完成，结果向上回传。',
      mechanism: 'CodeAgent 运行完 Python 脚本，将最终的执行日志与生成代码返回给工厂管理管线。',
      umlRule: '虚线箭头：执行结果回传，CodeAgent 的生命线激活状态结束。',
    },
    {
      step: 7,
      phaseName: '最终成果回传客户端',
      from: 'CodeAgentFactory',
      to: 'Client (业务调度端)',
      action: '最终交付业务输出结果',
      teachingPoint: '全流程结束，客户端得到了预期的成果，自始至终未曾与 CodeAgent 类发生强耦合。',
      mechanism: '整个流程完美践行了单一职责原则 (SRP) 与开闭原则 (OCP)。下周新增视觉智能体时，这套时序调用流程完全复用！',
      umlRule: '最终返回：工厂工作流生命周期结束，所有激活条复位。',
    },
  ];

  // 支持键盘左右方向键切换步骤（极度方便教学演示）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => Math.min(7, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 自动播放计时器
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 7) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const mermaidCode = `sequenceDiagram
    autonumber
    actor Client as 客户端 (Client)
    participant Factory as 具体工厂 (CodeAgentFactory)
    participant Product as 具体产品 (CodeAgent)

    Client->>Factory: 1. run_agent_workflow("编写代码任务")
    activate Factory
    Note over Factory: 调用内部工厂方法
    Factory->>Factory: 2. create_agent()
    Factory->>Product: 3. new CodeAgent(配置沙箱环境)
    activate Product
    Product-->>Factory: 4. 返回 CodeAgent 实例
    deactivate Product
    
    Note over Factory: 统一安全策略审计
    Factory->>Product: 5. execute_task("编写代码任务")
    activate Product
    Product-->>Factory: 6. 返回执行结果
    deactivate Product

    Factory-->>Client: 7. 返回任务执行输出
    deactivate Factory`;

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

      mermaid.render('mermaid-seq-graph', mermaidCode).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      }).catch((err) => {
        console.error('Mermaid sequence error:', err);
      });
    }
  }, [viewMode]);

  const curr = steps[currentStep - 1];

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
          <Clock size={18} color="#4f46e5" />
          <span>7 步分步教学时序图 (Interactive Sequence Walkthrough)</span>
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
            <span>📖 手动 7 步拆解教学</span>
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
          {/* 7 步水平进度轴 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            {steps.map((s) => {
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentStep(s.step);
                    setIsPlaying(false);
                  }}
                  style={{
                    backgroundColor: isActive ? '#eef2ff' : isPast ? '#f8fafc' : '#ffffff',
                    border: '1.5px solid',
                    borderColor: isActive ? '#4f46e5' : isPast ? '#cbd5e1' : '#e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 4px',
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
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#4f46e5' : isPast ? '#475569' : '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                    }}
                  >
                    {s.phaseName.slice(0, 5)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 教学控制工具栏 */}
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
              {/* 上一步按钮 */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep((p) => Math.max(1, p - 1));
                }}
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

              {/* 下一步核心按钮 (主 CTA) */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep((p) => (p >= 7 ? 1 : p + 1));
                }}
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
                <span>{currentStep === 7 ? '重新从第 1 步开始' : `下一步：第 ${currentStep + 1}/7 步 (→)`}</span>
                <ChevronRight size={16} />
              </button>

              {/* 自动演练 / 暂停开关 */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: isPlaying ? '#ecfdf5' : '#ffffff',
                  color: isPlaying ? '#059669' : '#64748b',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? '暂停自动播放' : '自动播放演示'}</span>
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#64748b' }}>
              💡 提示：按键盘 <kbd style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontFamily: 'monospace' }}>←</kbd> 或 <kbd style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontFamily: 'monospace' }}>→</kbd> 可直接切步
            </div>
          </div>

          {/* SVG 架构图动态视口 */}
          <div style={{ overflowX: 'auto', textAlign: 'center', padding: '10px 0' }}>
            <svg
              viewBox="0 0 860 380"
              style={{ width: '100%', maxWidth: '860px', margin: '0 auto', display: 'block' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow-photon-teach" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="teach-arrow-solid" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 1, 9 5, 0 9" fill="#4f46e5" />
                </marker>
                <marker id="teach-arrow-dash" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 1, 9 5, 0 9" fill="#64748b" />
                </marker>
              </defs>

              {/* 对象头 1: Client */}
              <rect x="50" y="16" width="140" height="38" rx="8" fill={currentStep === 1 || currentStep === 7 ? '#eef2ff' : '#f1f5f9'} stroke={currentStep === 1 || currentStep === 7 ? '#4f46e5' : '#cbd5e1'} strokeWidth={currentStep === 1 || currentStep === 7 ? '2' : '1.5'} />
              <text x="120" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">Client (客户端)</text>
              <line x1="120" y1="54" x2="120" y2="350" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />

              {/* 对象头 2: CodeAgentFactory */}
              <rect x="340" y="16" width="180" height="38" rx="8" fill={currentStep >= 1 && currentStep <= 7 ? '#fef3c7' : '#f8fafc'} stroke="#f59e0b" strokeWidth="2" />
              <text x="430" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">CodeAgentFactory</text>
              <line x1="430" y1="54" x2="430" y2="350" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />

              {/* 对象头 3: CodeAgent */}
              <rect x="660" y="16" width="150" height="38" rx="8" fill={currentStep >= 3 && currentStep <= 6 ? '#dcfce7' : '#f8fafc'} stroke={currentStep >= 3 && currentStep <= 6 ? '#10b981' : '#cbd5e1'} strokeWidth={currentStep >= 3 && currentStep <= 6 ? '2' : '1.5'} />
              <text x="735" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">CodeAgent (产品)</text>
              <line x1="735" y1="54" x2="735" y2="350" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />

              {/* 激活条 (Activation Bars) */}
              <rect x="424" y="80" width="12" height="240" rx="3" fill={currentStep >= 1 ? '#fbbf24' : '#f1f5f9'} stroke="#d97706" />
              <rect x="729" y="140" width="12" height="150" rx="3" fill={currentStep >= 3 && currentStep <= 6 ? '#34d399' : '#f1f5f9'} stroke="#059669" />

              {/* 消息 1: run_agent_workflow */}
              <g opacity={currentStep === 1 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="120" y1="85" x2="420" y2="85" stroke="#4f46e5" strokeWidth={currentStep === 1 ? '2.5' : '1.5'} markerEnd="url(#teach-arrow-solid)" />
                <rect x="175" y="64" width="190" height="22" rx="4" fill={currentStep === 1 ? '#eef2ff' : '#ffffff'} stroke={currentStep === 1 ? '#4f46e5' : '#e2e8f0'} />
                <text x="270" y="80" textAnchor="middle" fontSize="11.5" fontWeight={currentStep === 1 ? '700' : '500'} fill="#4f46e5">1. run_agent_workflow("任务")</text>
                {currentStep === 1 && (
                  <circle r="4" fill="#4f46e5" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="120" to="420" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="85" to="85" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* 消息 2: 内部 create_agent() */}
              <g opacity={currentStep === 2 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <path d="M 436 105 H 480 V 125 H 438" fill="none" stroke="#d97706" strokeWidth={currentStep === 2 ? '2.5' : '1.5'} markerEnd="url(#teach-arrow-solid)" />
                <rect x="490" y="104" width="220" height="22" rx="4" fill={currentStep === 2 ? '#fef3c7' : '#ffffff'} stroke={currentStep === 2 ? '#d97706' : '#e2e8f0'} />
                <text x="600" y="119" textAnchor="middle" fontSize="11.5" fontWeight={currentStep === 2 ? '700' : '500'} fill="#b45309">2. create_agent() [工厂方法触发]</text>
              </g>

              {/* 消息 3: 实例化 CodeAgent */}
              <g opacity={currentStep === 3 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="436" y1="145" x2="725" y2="145" stroke="#059669" strokeWidth={currentStep === 3 ? '2.5' : '1.5'} markerEnd="url(#teach-arrow-solid)" />
                <rect x="485" y="124" width="190" height="22" rx="4" fill={currentStep === 3 ? '#ecfdf5' : '#ffffff'} stroke={currentStep === 3 ? '#059669' : '#e2e8f0'} />
                <text x="580" y="140" textAnchor="middle" fontSize="11.5" fontWeight={currentStep === 3 ? '700' : '500'} fill="#059669">3. new CodeAgent(配置沙箱)</text>
                {currentStep === 3 && (
                  <circle r="4" fill="#059669" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="436" to="725" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="145" to="145" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* 消息 4: 实例引用返回 */}
              <g opacity={currentStep === 4 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="729" y1="180" x2="438" y2="180" stroke="#64748b" strokeWidth={currentStep === 4 ? '2.5' : '1.5'} strokeDasharray="4,4" markerEnd="url(#teach-arrow-dash)" />
                <rect x="490" y="162" width="180" height="20" rx="4" fill={currentStep === 4 ? '#f1f5f9' : '#ffffff'} stroke={currentStep === 4 ? '#64748b' : '#e2e8f0'} />
                <text x="580" y="176" textAnchor="middle" fontSize="11" fontWeight={currentStep === 4 ? '700' : '500'} fill="#475569">4. 返回 Agent 实例引用</text>
                {currentStep === 4 && (
                  <circle r="3.5" fill="#64748b" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="729" to="438" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="180" to="180" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* 消息 5: execute_task() */}
              <g opacity={currentStep === 5 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="436" y1="220" x2="725" y2="220" stroke="#4f46e5" strokeWidth={currentStep === 5 ? '2.5' : '1.5'} markerEnd="url(#teach-arrow-solid)" />
                <rect x="485" y="199" width="190" height="22" rx="4" fill={currentStep === 5 ? '#eef2ff' : '#ffffff'} stroke={currentStep === 5 ? '#4f46e5' : '#e2e8f0'} />
                <text x="580" y="215" textAnchor="middle" fontSize="11.5" fontWeight={currentStep === 5 ? '700' : '500'} fill="#4f46e5">5. execute_task("编写代码任务")</text>
                {currentStep === 5 && (
                  <circle r="4" fill="#4f46e5" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="436" to="725" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="220" to="220" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* 消息 6: 返回执行输出 */}
              <g opacity={currentStep === 6 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="729" y1="265" x2="438" y2="265" stroke="#64748b" strokeWidth={currentStep === 6 ? '2.5' : '1.5'} strokeDasharray="4,4" markerEnd="url(#teach-arrow-dash)" />
                <rect x="490" y="247" width="180" height="20" rx="4" fill={currentStep === 6 ? '#f1f5f9' : '#ffffff'} stroke={currentStep === 6 ? '#64748b' : '#e2e8f0'} />
                <text x="580" y="261" textAnchor="middle" fontSize="11" fontWeight={currentStep === 6 ? '700' : '500'} fill="#475569">6. 返回结果 (Exit: 0)</text>
                {currentStep === 6 && (
                  <circle r="3.5" fill="#64748b" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="729" to="438" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="265" to="265" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* 消息 7: 最终交付 Client */}
              <g opacity={currentStep === 7 ? 1 : 0.22} style={{ transition: 'opacity 0.25s' }}>
                <line x1="424" y1="310" x2="125" y2="310" stroke="#0f172a" strokeWidth={currentStep === 7 ? '2.5' : '1.5'} strokeDasharray="4,4" markerEnd="url(#teach-arrow-dash)" />
                <rect x="180" y="294" width="180" height="22" rx="4" fill={currentStep === 7 ? '#f8fafc' : '#ffffff'} stroke={currentStep === 7 ? '#0f172a' : '#e2e8f0'} />
                <text x="270" y="309" textAnchor="middle" fontSize="11.5" fontWeight={currentStep === 7 ? '700' : '500'} fill="#0f172a">7. 交付最终任务成果</text>
                {currentStep === 7 && (
                  <circle r="4" fill="#0f172a" filter="url(#glow-photon-teach)">
                    <animate attributeName="cx" from="424" to="125" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" from="310" to="310" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            </svg>
          </div>

          {/* 专属教学分步详解卡片 */}
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
            {/* 步骤标题行 */}
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
                  Step {curr.step} / 7
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                  {curr.phaseName}
                </h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                <span style={{ fontWeight: 600 }}>{curr.from}</span>
                <ArrowRight size={13} />
                <span style={{ fontWeight: 600 }}>{curr.to}</span>
              </div>
            </div>

            {/* 代码动作标识 */}
            <div
              style={{
                backgroundColor: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: '6px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12.5px',
                color: '#334155',
                marginBottom: '14px',
                border: '1px solid #e2e8f0',
                display: 'inline-block',
              }}
            >
              <code>{curr.action}</code>
            </div>

            {/* 教学解析三要素 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '13px', lineHeight: 1.65 }}>
              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🎯 教学要点 (Key Concept)</span>
                </div>
                <div style={{ color: '#334155' }}>{curr.teachingPoint}</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#059669', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🔍 底层机制 (Mechanism)</span>
                </div>
                <div style={{ color: '#334155' }}>{curr.mechanism}</div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#d97706', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📐 UML 规范 (UML Rule)</span>
                </div>
                <div style={{ color: '#334155' }}>{curr.umlRule}</div>
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
