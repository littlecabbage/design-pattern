import React, { useState } from 'react';
import { Bot, Terminal, PlusCircle, RefreshCw, Send } from 'lucide-react';

interface FactoryOption {
  id: string;
  name: string;
  factoryClass: string;
  productClass: string;
  badgeColor: string;
  defaultTask: string;
  dependencies: string;
  model: string;
}

export const InteractiveAgentLab: React.FC = () => {
  const initialFactories: FactoryOption[] = [
    {
      id: 'code',
      name: '代码生成与执行工坊',
      factoryClass: 'CodeAgentFactory',
      productClass: 'CodeAgent',
      badgeColor: '#10b981',
      defaultTask: '实现一个基于 FastAPI 的异步 Webhook 监听服务',
      dependencies: 'Docker Sandbox (Port: 9090), Python REPL Engine',
      model: 'claude-3-7-sonnet',
    },
    {
      id: 'research',
      name: '深度学术研报工坊',
      factoryClass: 'ResearchAgentFactory',
      productClass: 'ResearchAgent',
      badgeColor: '#6366f1',
      defaultTask: '检索 2026 年多智能体协作 (Multi-Agent Swarm) 权威论文并生成研报',
      dependencies: 'Milvus 向量知识库, Google Search RAG API',
      model: 'gemini-1.5-pro',
    },
  ];

  const [factories, setFactories] = useState<FactoryOption[]>(initialFactories);
  const [selectedFactoryId, setSelectedFactoryId] = useState<string>('code');
  const [taskInput, setTaskInput] = useState<string>(initialFactories[0].defaultTask);
  const [logs, setLogs] = useState<Array<{ text: string; type: 'info' | 'factory' | 'product' | 'success' | 'security' }>>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visionRegistered, setVisionRegistered] = useState<boolean>(false);

  const currentFactory = factories.find((f) => f.id === selectedFactoryId) || factories[0];

  const handleSelectFactory = (factory: FactoryOption) => {
    setSelectedFactoryId(factory.id);
    setTaskInput(factory.defaultTask);
  };

  const handleRegisterVisionAgent = () => {
    if (visionRegistered) return;
    const visionFactory: FactoryOption = {
      id: 'vision',
      name: '多模态视觉分析工坊 (新扩展)',
      factoryClass: 'VisionAgentFactory',
      productClass: 'VisionAgent',
      badgeColor: '#ec4899',
      defaultTask: '分析传入的复杂 UML 类图架构草图并转换为代码',
      dependencies: 'OpenCV 图像引擎, Vision Tokenizer',
      model: 'gpt-4o-vision',
    };
    setFactories((prev) => [...prev, visionFactory]);
    setVisionRegistered(true);
    setSelectedFactoryId('vision');
    setTaskInput(visionFactory.defaultTask);
    setLogs((prev) => [
      ...prev,
      {
        text: '✨ [OCP 开闭原则演示] 动态注册了全新的 VisionAgentFactory 及其产品 VisionAgent，核心调度引擎未发生任何代码修改！',
        type: 'success',
      },
    ]);
  };

  const handleRunWorkflow = async () => {
    setIsRunning(true);
    setLogs([
      { text: `[Client] 客户端将任务分发给工厂: ${currentFactory.factoryClass}`, type: 'info' },
      { text: `[Task] 任务内容: "${taskInput}"`, type: 'info' },
    ]);

    await new Promise((r) => setTimeout(r, 600));
    setLogs((prev) => [
      ...prev,
      { text: `[Factory Pipeline] 触发工厂方法: ${currentFactory.factoryClass}.create_agent()`, type: 'factory' },
      { text: `  ↳ [Assembly] 正在为 ${currentFactory.productClass} 装载依赖: ${currentFactory.dependencies}`, type: 'factory' },
    ]);

    await new Promise((r) => setTimeout(r, 700));
    setLogs((prev) => [
      ...prev,
      { text: `[Security] 执行基类安全审计策略: Agent 身份合规、Token 配额充足 -> PASSED`, type: 'security' },
    ]);

    await new Promise((r) => setTimeout(r, 800));
    setLogs((prev) => [
      ...prev,
      { text: `[Agent Execution] ${currentFactory.productClass} (${currentFactory.model}) 开始执行任务...`, type: 'product' },
    ]);

    await new Promise((r) => setTimeout(r, 900));
    let resultMsg = '';
    if (currentFactory.id === 'code') {
      resultMsg = `💻 代码生成完毕并在沙箱执行测试 (Exit: 0)！生成了 120 行生产级异步代码。`;
    } else if (currentFactory.id === 'research') {
      resultMsg = `🔍 检索了 8 篇权威论文并向量化比对，输出了 2,500 字的 Multi-Agent Swarm 架构趋势白皮书。`;
    } else {
      resultMsg = `👁️ 图像解析完成！成功从架构草图中提取出 4 个实体类与 6 条 UML 关联，生成完整代码脚手架。`;
    }

    setLogs((prev) => [
      ...prev,
      { text: `[Result] ${resultMsg}`, type: 'success' },
      { text: `[Client] 客户端顺利接收任务结果，流水线结束！`, type: 'info' },
    ]);
    setIsRunning(false);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={20} color="#4f46e5" />
          <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0f172a' }}>
            交互式智能体工坊仿真器 (Agent Swarm Lab)
          </h3>
        </div>
        <span style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: '9999px' }}>
          体验多态工厂的无缝解耦与动态扩展
        </span>
      </div>

      {/* 工厂选择器 */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '8px' }}>
          1. 选择要实例化的具体工厂 (Concrete Factory)：
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {factories.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelectFactory(f)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid',
                borderColor: selectedFactoryId === f.id ? '#4f46e5' : '#e2e8f0',
                backgroundColor: selectedFactoryId === f.id ? '#eef2ff' : '#ffffff',
                color: selectedFactoryId === f.id ? '#312e81' : '#475569',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: f.badgeColor }} />
              <span>{f.name}</span>
              <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>
                ({f.factoryClass})
              </span>
            </button>
          ))}

          {!visionRegistered && (
            <button
              onClick={handleRegisterVisionAgent}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1.5px dashed #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#475569',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <PlusCircle size={14} color="#ec4899" />
              <span>+ 动态扩展新工厂 (VisionAgent)</span>
            </button>
          )}
        </div>
      </div>

      {/* 任务输入框与触发 */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
          2. 输入任务 Prompt：
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            disabled={isRunning}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13.5px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: 'none',
            }}
          />
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning || !taskInput.trim()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.7 : 1,
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            {isRunning ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
            <span>{isRunning ? '流水线执行中...' : '启动流水线'}</span>
          </button>
        </div>
      </div>

      {/* 终端模拟执行日志 (带 macOS 风格控制红黄绿点与质感) */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          borderRadius: '12px',
          padding: '14px 18px',
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          fontSize: '12.5px',
          lineHeight: '1.65',
          minHeight: '160px',
          maxHeight: '260px',
          overflowY: 'auto',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11px' }}>
            <Terminal size={12} />
            <span>multi-agent-orchestrator.log</span>
          </div>
        </div>

        {logs.length === 0 ? (
          <div style={{ color: '#64748b', fontStyle: 'italic', padding: '10px 0' }}>
            # 点击上方「启动流水线」按钮，观察工厂如何多态装配智能体...
          </div>
        ) : (
          logs.map((log, idx) => {
            let color = '#e2e8f0';
            if (log.type === 'factory') color = '#fbbf24';
            if (log.type === 'product') color = '#38bdf8';
            if (log.type === 'security') color = '#a78bfa';
            if (log.type === 'success') color = '#4ade80';
            return (
              <div key={idx} style={{ color, marginBottom: '4px' }}>
                {log.text}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
