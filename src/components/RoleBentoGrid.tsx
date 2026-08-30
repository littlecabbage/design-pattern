import React, { useState } from 'react';
import { Box, Factory, Cpu, Hammer, CheckCircle2, Sparkles, HelpCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Role {
  id: string;
  roleType: string;
  roleTypeEn: string;
  title: string;
  badgeBg: string;
  badgeColor: string;
  icon: any;
  summary: string;
  responsibilities: string[];
  analogy: string;
  codeSnippet: string;
}

export const RoleBentoGrid: React.FC = () => {
  const [activeRoleId, setActiveRoleId] = useState<string>('abstract-creator');

  const roles: Role[] = [
    {
      id: 'abstract-product',
      roleType: '抽象产品',
      roleTypeEn: 'Abstract Product',
      title: 'Agent (智能体统一抽象类/接口)',
      badgeBg: '#e0e7ff',
      badgeColor: '#3730a3',
      icon: Box,
      summary: '定义所有具体智能体必须遵守的公共方法契约（如 execute_task()）。客户端只面向此接口编程。',
      responsibilities: [
        '规范统一的方法签名与出入参结构',
        '向调用方隐藏底层具体智能体的繁琐差异',
        '作为工厂方法的统一返回类型契约',
      ],
      analogy: '「抽象产品」是所有子类的规范契约。如果你不理解，你就理解为：一张国家规定的「标准汽车驾驶台图纸」——它硬性规定车子必须有方向盘和刹车踏板，但它只是一张图纸，不能直接开上路。',
      codeSnippet: `class Agent(ABC):
    @abstractmethod
    def execute_task(self, task: str) -> str:
        """所有具体智能体都必须实现的接口"""
        pass`,
    },
    {
      id: 'concrete-product',
      roleType: '具体产品',
      roleTypeEn: 'Concrete Product',
      title: 'CodeAgent / ResearchAgent',
      badgeBg: '#dcfce7',
      badgeColor: '#166534',
      icon: Cpu,
      summary: '真正实现具体业务逻辑的实体，封装了不同智能体专属的模型调用参数、提示词与工具链。',
      responsibilities: [
        '实现抽象产品定义的所有抽象方法',
        '管理自身特有的私有状态（如沙箱端口、向量知识库连接）',
        '由对应的具体工厂创建，业务调度端绝不应该直接 new',
      ],
      analogy: '「具体产品」是真正干活的实物对象。如果你不理解，你就理解为：特斯拉 Model Y 或保时捷 911 等「真实出厂的汽车实物」——虽然一个用电池一个烧汽油，但驾驶员都能用标准方向盘踩油门开走。',
      codeSnippet: `class CodeAgent(Agent):
    def __init__(self, sandbox_port: int):
        self.sandbox_port = sandbox_port
        
    def execute_task(self, task: str) -> str:
        return f"💻 沙箱 (Port {self.sandbox_port}) 执行代码成功: {task}"`,
    },
    {
      id: 'abstract-creator',
      roleType: '抽象创建者 / 工厂基类',
      roleTypeEn: 'Abstract Creator',
      title: 'AgentFactory (抽象工坊基类)',
      badgeBg: '#fef3c7',
      badgeColor: '#92400e',
      icon: Factory,
      summary: '声明核心工厂方法 create_agent()，并可包含通用的生命周期管理模板（如安全检测、Token 配额核对）。',
      responsibilities: [
        '声明工厂方法 create_agent()（由子类填空实现）',
        '提供依赖于 Agent 抽象实例的高层工作流业务模板',
        '把对象的具体创建细节推迟到子类完成，实现架构解耦',
      ],
      analogy: '「抽象创建者」是管理生产线的总指挥部。如果你不理解，你就理解为：汽车制造集团总部的「标准管理制度」——它规定每个加盟分厂都必须拥有「造车流水线」和「出厂质检流程」，但总部自己不亲自拧螺丝，交给分厂搞定。',
      codeSnippet: `class AgentFactory(ABC):
    @abstractmethod
    def create_agent(self) -> Agent:
        """【核心工厂方法 (单产品维度)】：留给子类具体实现"""
        pass
        
    def run_agent_workflow(self, task: str) -> str:
        # 统一执行安全审计，然后多态调用
        agent = self.create_agent() 
        return agent.execute_task(task)`,
    },
    {
      id: 'concrete-creator',
      roleType: '具体工厂',
      roleTypeEn: 'Concrete Creator',
      title: 'CodeAgentFactory / ResearchAgentFactory',
      badgeBg: '#fee2e2',
      badgeColor: '#991b1b',
      icon: Hammer,
      summary: '重写父类工厂方法，编写专属的装配代码，负责实例化对应的具体 Agent 对象并返回。',
      responsibilities: [
        '重写 create_agent() 工厂方法',
        '封装创建该 Agent 所需的所有繁琐参数（如端口、API-Key、知识库 URL）',
        '返回具体的 Agent 实例，向上转型为抽象类型供系统调度',
      ],
      analogy: '「具体工厂」是真正开工组装零件的车间。如果你不理解，你就理解为：专门生产纯电车的「上海超级工厂」或者专门生产燃油车的「斯图加特工厂」——它们各自在车间里把电机或引擎装配好，出厂交车。',
      codeSnippet: `class CodeAgentFactory(AgentFactory):
    def create_agent(self) -> Agent:
        # 在工厂内部组装沙箱参数
        return CodeAgent(sandbox_port=8080)`,
    },
  ];

  const currentRole = roles.find((r) => r.id === activeRoleId) || roles[0];
  const IconComponent = currentRole.icon;

  return (
    <div style={{ margin: '24px 0' }}>
      {/* 4 角色卡片 Bento 切换网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {roles.map((role) => {
          const isActive = role.id === activeRoleId;
          const RoleIcon = role.icon;
          return (
            <div
              key={role.id}
              onClick={() => setActiveRoleId(role.id)}
              style={{
                backgroundColor: isActive ? '#ffffff' : '#fafbfc',
                border: '1.5px solid',
                borderColor: isActive ? '#4f46e5' : '#e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 8px 24px -4px rgba(79, 70, 229, 0.12)' : 'none',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span
                  style={{
                    backgroundColor: role.badgeBg,
                    color: role.badgeColor,
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {role.roleType}
                </span>
                <RoleIcon size={18} color={isActive ? '#4f46e5' : '#64748b'} />
              </div>
              <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {role.title.split(' ')[0]}
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {role.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* 角色详情展示面板 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px 24px',
          boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.04)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div
            style={{
              backgroundColor: currentRole.badgeBg,
              color: currentRole.badgeColor,
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <IconComponent size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
              {currentRole.roleType}（{currentRole.roleTypeEn}）：{currentRole.title}
            </h4>
          </div>
        </div>

        {/* 形象比喻框：严格包含“xxx是xxx，如果你不理解，你就理解为xxx” */}
        <div
          style={{
            backgroundColor: '#eef2ff',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '16px',
            fontSize: '13.5px',
            color: '#312e81',
            lineHeight: 1.65,
          }}
        >
          <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} />
            <span>初学者大白话理解：</span>
          </div>
          <div>{currentRole.analogy}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'start' }}>
          <div>
            <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              🎯 核心职责 (Responsibilities)：
            </h5>
            <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentRole.responsibilities.map((resp, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#475569' }}>
                  <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              💻 代码骨架样例 (Code Blueprint)：
            </h5>
            <pre
              style={{
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                padding: '12px 14px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1.5,
                margin: 0,
                overflowX: 'auto',
              }}
            >
              <code>{currentRole.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 💡 关键概念澄清卡片：为什么本案例是纯粹的工厂方法，而不是抽象工厂？ */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          border: '1.5px solid #fde68a',
          borderRadius: '14px',
          padding: '18px 22px',
          boxShadow: '0 2px 8px -2px rgba(217, 119, 6, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <HelpCircle size={19} color="#d97706" />
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#92400e', margin: 0 }}>
            💡 必背高频疑点：工厂方法里的「抽象工厂基类 (Abstract Creator)」≠「抽象工厂模式 (Abstract Factory)」
          </h4>
        </div>

        <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.7, margin: '0 0 12px' }}>
          很多初学者看到代码里定义了 <code>class AgentFactory(ABC)</code>（一个抽象的工厂基类），就误以为这是<strong>抽象工厂模式</strong>。
          <strong>其实本案例是 100% 纯粹的「工厂方法模式 (Factory Method)」！</strong>
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #fed7aa' }}>
            <thead>
              <tr style={{ backgroundColor: '#ffedd5', color: '#9a3412', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa' }}>对比维度</th>
                <th style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa' }}>本案例：工厂方法模式 (Factory Method)</th>
                <th style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa' }}>进阶：抽象工厂模式 (Abstract Factory)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', fontWeight: 700, color: '#78350f' }}>产品维度</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', color: '#166534', fontWeight: 600 }}>
                  <strong>单产品等级结构</strong>（只生产 1 种产品：<code>Agent</code>）
                </td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', color: '#991b1b' }}>
                  <strong>多产品族/产品全家桶</strong>（同时生产 <code>LLMBrain</code> + <code>Memory</code> + <code>Sandbox</code>）
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', fontWeight: 700, color: '#78350f' }}>工厂方法数量</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', color: '#166534', fontWeight: 600 }}>
                  <strong>只有 1 个</strong>工厂方法：<code>create_agent()</code>
                </td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #fed7aa', color: '#991b1b' }}>
                  <strong>有多个</strong>配套工厂方法：<code>create_brain()</code>, <code>create_memory()</code>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', fontWeight: 700, color: '#78350f' }}>大白话比喻</td>
                <td style={{ padding: '8px 12px', color: '#166534' }}>
                  <strong>「专业代工厂只造车」</strong>：上海工厂造 Model Y，斯图加特造保时捷。
                </td>
                <td style={{ padding: '8px 12px', color: '#991b1b' }}>
                  <strong>「生态全家桶工厂」</strong>：苹果工厂同时造 iPhone + Mac + Apple Watch 一整套生态。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
