import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  FolderTree,
  Folder,
  FolderOpen,
  FileCode,
  Check,
  Copy,
  Play,
  Terminal,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  RotateCcw,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface CodeFile {
  stepNum: string;
  stepIdx: number;
  stepTitle: string;
  filePath: string;
  fileName: string;
  folder: string;
  roleType: string;
  devReason: string;
  code: string;
}

export const ProjectCodeViewer: React.FC = () => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [terminalRunning, setTerminalRunning] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  // 文件夹展开折叠状态
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({
    base: true,
    agents: true,
    factories: true,
  });

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const files: CodeFile[] = [
    {
      stepNum: 'Step 01',
      stepIdx: 1,
      stepTitle: '定义抽象产品契约',
      filePath: 'base/agent.py',
      fileName: 'agent.py',
      folder: 'base',
      roleType: '抽象产品 (Abstract Product)',
      devReason: '【开发第一步】：先立标准规范，各模块才能并行开发。在 base/ 目录下定义所有 Agent 必须遵守的公共契约 execute_task()。',
      code: `"""
文件路径: base/agent.py
角色定位: 抽象产品 (Abstract Product)
职责说明: 定义所有具体智能体必须遵守的顶层公共接口契约
"""
from abc import ABC, abstractmethod


class Agent(ABC):
    """
    智能体统一抽象基类
    
    【注：抽象类是定义规范但未完工的基类。如果你不理解，你就理解为一张盖了公章的半成品汽车图纸】
    """
    def __init__(self, name: str, model_name: str):
        self.name = name
        self.model_name = model_name

    @abstractmethod
    def execute_task(self, task: str) -> str:
        """
        【核心抽象方法】：所有具体智能体都必须实现的业务方法
        
        :param task: 用户输入的任务提示词 (Prompt)
        :return: 智能体执行后的结果字符串
        """
        pass
`,
    },
    {
      stepNum: 'Step 02',
      stepIdx: 2,
      stepTitle: '实现具体产品：代码智能体',
      filePath: 'agents/code_agent.py',
      fileName: 'code_agent.py',
      folder: 'agents',
      roleType: '具体产品 (Concrete Product)',
      devReason: '【开发第二步】：继承 base.Agent 基类，在 agents/ 目录下实现专精于编写代码并执行的智能体，封装特有的沙箱端口参数。',
      code: `"""
文件路径: agents/code_agent.py
角色定位: 具体产品 (Concrete Product)
职责说明: 实现代码生成与沙箱执行的专属智能体
"""
from base.agent import Agent


class CodeAgent(Agent):
    """
    代码智能体：负责编写、修复并运行程序代码
    
    【注：具体产品是真正出厂的实体真车。如果你不理解，你就理解为真正出厂能踩油门跑的特斯拉】
    """
    def __init__(self, name: str, model_name: str, sandbox_port: int, allow_exec: bool = True):
        super().__init__(name=name, model_name=model_name)
        self.sandbox_port = sandbox_port
        self.allow_exec = allow_exec
        print(f"  [Init] 🚀 {self.name} 沙箱容器就绪 (端口: {self.sandbox_port})")

    def execute_task(self, task: str) -> str:
        # 模拟智能体在隔离沙箱环境中生成并运行 Python 脚本
        return f"💻 [{self.name} ({self.model_name})] 成功解析需求: '{task}' -> 生成 Python 脚本并在沙箱执行完毕 (Exit: 0)"
`,
    },
    {
      stepNum: 'Step 03',
      stepIdx: 3,
      stepTitle: '实现具体产品：研报智能体',
      filePath: 'agents/research_agent.py',
      fileName: 'research_agent.py',
      folder: 'agents',
      roleType: '具体产品 (Concrete Product)',
      devReason: '【开发第三步】：实现研报检索智能体，在 agents/ 目录下封装向量数据库连接与搜索引擎等私有依赖。',
      code: `"""
文件路径: agents/research_agent.py
角色定位: 具体产品 (Concrete Product)
职责说明: 负责全网深度检索、向量比对与长篇研报撰写
"""
from base.agent import Agent


class ResearchAgent(Agent):
    """
    研报智能体：负责网络检索与文档向量比对
    """
    def __init__(self, name: str, model_name: str, vector_db_url: str, search_depth: int = 3):
        super().__init__(name=name, model_name=model_name)
        self.vector_db_url = vector_db_url
        self.search_depth = search_depth
        print(f"  [Init] 📚 {self.name} 挂载企业 RAG 知识库: {self.vector_db_url}")

    def execute_task(self, task: str) -> str:
        # 模拟智能体检索向量数据库并总结论文
        return f"🔍 [{self.name} ({self.model_name})] 检索知识库并分析 '{task}' -> 输出了包含 5 篇权威来源的深度调研研报"
`,
    },
    {
      stepNum: 'Step 04',
      stepIdx: 4,
      stepTitle: '声明抽象工厂与通用生命周期管线',
      filePath: 'base/factory.py',
      fileName: 'factory.py',
      folder: 'base',
      roleType: '抽象工厂 (Abstract Creator)',
      devReason: '【开发第四步·核心转折点】：在 base/ 目录下定义工厂基类，声明抽象工厂方法 create_agent()，并编写通用的 run_agent_workflow() 生命周期模板方法。',
      code: `"""
文件路径: base/factory.py
角色定位: 抽象工厂 / 创建者 (Abstract Creator)
职责说明: 声明核心工厂方法 create_agent()，并封装高阶通用业务流水线
"""
from abc import ABC, abstractmethod
from base.agent import Agent


class AgentFactory(ABC):
    """
    抽象工厂基类
    
    【注：抽象工厂是总指挥部。如果你不理解，你就理解为集团总部的标准生产与质检制度】
    """
    @abstractmethod
    def create_agent(self) -> Agent:
        """
        【核心工厂方法 (Factory Method)】
        声明创建对象的抽象契约，返回顶层抽象 Agent 类型。
        具体实例化哪个子类对象，完全延迟到子类工厂去实现！
        """
        pass

    def run_agent_workflow(self, task: str) -> str:
        """
        【模板方法 / 通用业务流水线】
        高层业务逻辑完全依赖 Agent 抽象契约，在此处可统一注入切面（如安全审计、配额核减）
        """
        print(f"\\n[Factory Pipeline] 🚀 启动智能体执行流水线...")
        
        # 1. 多态调用工厂方法创建具体 Agent
        agent = self.create_agent()
        
        # 2. 统一的安全策略前置审计 (所有智能体共享)
        print(f"[Security Check] 🛡️ 针对 Agent '{agent.name}' 执行安全策略检测: PASSED")
        
        # 3. 业务多态执行
        result = agent.execute_task(task)
        print(f"[Factory Pipeline] ✨ 任务执行完毕，准备回传客户端成果。")
        return result
`,
    },
    {
      stepNum: 'Step 05',
      stepIdx: 5,
      stepTitle: '实现具体工厂：代码智能体工坊',
      filePath: 'factories/code_factory.py',
      fileName: 'code_factory.py',
      folder: 'factories',
      roleType: '具体工厂 (Concrete Creator)',
      devReason: '【开发第五步】：在 factories/ 目录下实现代码工坊子类，专门封装 CodeAgent 繁琐的沙箱端口和编译器组装细节。',
      code: `"""
文件路径: factories/code_factory.py
角色定位: 具体工厂 (Concrete Creator)
职责说明: 专精于装配并产出 CodeAgent 实例
"""
from base.factory import AgentFactory
from base.agent import Agent
from agents.code_agent import CodeAgent


class CodeAgentFactory(AgentFactory):
    """
    代码智能体工坊：重写 create_agent() 工厂方法
    """
    def __init__(self, custom_model: str = "claude-3-7-sonnet"):
        self.custom_model = custom_model

    def create_agent(self) -> Agent:
        # 在工厂自己的私有领地内组装复杂的沙箱与参数配置
        return CodeAgent(
            name="DevExpert-Agent",
            model_name=self.custom_model,
            sandbox_port=9090,
            allow_exec=True
        )
`,
    },
    {
      stepNum: 'Step 06',
      stepIdx: 6,
      stepTitle: '实现具体工厂：研报智能体工坊',
      filePath: 'factories/research_factory.py',
      fileName: 'research_factory.py',
      folder: 'factories',
      roleType: '具体工厂 (Concrete Creator)',
      devReason: '【开发第六步】：在 factories/ 目录下实现研报工坊子类，专门封装 ResearchAgent 向量库端点与检索深度的装配细节。',
      code: `"""
文件路径: factories/research_factory.py
角色定位: 具体工厂 (Concrete Creator)
职责说明: 专精于装配并产出 ResearchAgent 实例
"""
from base.factory import AgentFactory
from base.agent import Agent
from agents.research_agent import ResearchAgent


class ResearchAgentFactory(AgentFactory):
    """
    研报智能体工坊：重写 create_agent() 工厂方法
    """
    def __init__(self, db_endpoint: str = "https://rag.enterprise.internal"):
        self.db_endpoint = db_endpoint

    def create_agent(self) -> Agent:
        # 在工厂内部完成 RAG 知识库与检索深度的装配
        return ResearchAgent(
            name="Scholar-Agent",
            model_name="gemini-1.5-pro",
            vector_db_url=self.db_endpoint,
            search_depth=3
        )
`,
    },
    {
      stepNum: 'Step 07',
      stepIdx: 7,
      stepTitle: '客户端业务调度中心与解耦运行',
      filePath: 'main.py',
      fileName: 'main.py',
      folder: 'root',
      roleType: '业务客户端 (Client Entry)',
      devReason: '【开发第七步·最终组装】：根目录下 main.py 客户端调度函数 client_orchestrator 只依赖抽象基类 AgentFactory，彻底摆脱具体类依赖！',
      code: `"""
文件路径: main.py
角色定位: 业务调度客户端 (Client Orchestrator)
职责说明: 演示客户端如何面向 AgentFactory 抽象编程，彻底解耦具体创建
"""
from base.factory import AgentFactory
from factories.code_factory import CodeAgentFactory
from factories.research_factory import ResearchAgentFactory


def client_orchestrator(factory: AgentFactory, user_task: str):
    """
    客户端调度器：只面向抽象工厂 AgentFactory 编程！
    自始至终没有出现任何具体的 CodeAgent 或 ResearchAgent 类名。
    """
    print(f"==================================================")
    print(f"[Client] 客户端接收到用户任务: '{user_task}'")
    
    # 触发工厂生命周期流水线
    response = factory.run_agent_workflow(user_task)
    print(f"[Client Output] 最终接收到成果:\\n  ↳ {response}\\n")


if __name__ == "__main__":
    print("🎯 === 多智能体工厂方法模式生产架构启动 ===\\n")

    # 1. 客户端需要代码生成任务 -> 传入代码工坊
    dev_factory = CodeAgentFactory(custom_model="claude-3-7-sonnet")
    client_orchestrator(dev_factory, "实现一个基于 FastAPI 的异步 Webhook 监听服务")

    # 2. 客户端需要深度研报任务 -> 传入研报工坊
    research_factory = ResearchAgentFactory(db_endpoint="https://rag.enterprise.internal")
    client_orchestrator(research_factory, "调研 2026 年多智能体协作架构 (Multi-Agent Swarm) 趋势")
`,
    },
  ];

  const currentFile = files[activeFileIndex];
  const progressPercent = Math.round(((activeFileIndex + 1) / files.length) * 100);

  // 键盘快捷键切步
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        setActiveFileIndex((prev) => Math.min(files.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveFileIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [files.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunMainPy = async () => {
    setTerminalRunning(true);
    setTerminalLogs(['$ python main.py', '🎯 === 多智能体工厂方法模式生产架构启动 ===\n']);
    
    await new Promise((r) => setTimeout(r, 450));
    setTerminalLogs((prev) => [
      ...prev,
      '==================================================',
      "[Client] 客户端接收到用户任务: '实现一个基于 FastAPI 的异步 Webhook 监听服务'",
      '[Factory Pipeline] 🚀 启动智能体执行流水线...',
      '  [Init] 🚀 DevExpert-Agent 沙箱容器就绪 (端口: 9090)',
      "[Security Check] 🛡️ 针对 Agent 'DevExpert-Agent' 执行安全策略检测: PASSED",
      '[Factory Pipeline] ✨ 任务执行完毕，准备回传客户端成果。',
      "[Client Output] 最终接收到成果:\n  ↳ 💻 [DevExpert-Agent (claude-3-7-sonnet)] 成功解析需求: '实现一个基于 FastAPI 的异步 Webhook 监听服务' -> 生成 Python 脚本并在沙箱执行完毕 (Exit: 0)\n",
    ]);

    await new Promise((r) => setTimeout(r, 550));
    setTerminalLogs((prev) => [
      ...prev,
      '==================================================',
      "[Client] 客户端接收到用户任务: '调研 2026 年多智能体协作架构 (Multi-Agent Swarm) 趋势'",
      '[Factory Pipeline] 🚀 启动智能体执行流水线...',
      '  [Init] 📚 Scholar-Agent 挂载企业 RAG 知识库: https://rag.enterprise.internal',
      "[Security Check] 🛡️ 针对 Agent 'Scholar-Agent' 执行安全策略检测: PASSED",
      '[Factory Pipeline] ✨ 任务执行完毕，准备回传客户端成果。',
      "[Client Output] 最终接收到成果:\n  ↳ 🔍 [Scholar-Agent (gemini-1.5-pro)] 检索知识库并分析 '调研 2026 年多智能体协作架构 (Multi-Agent Swarm) 趋势' -> 输出了包含 5 篇权威来源的深度调研研报\n",
      '✨ [Execution Completed] 进程退出码 Exit: 0',
    ]);
    setTerminalRunning(false);
  };

  // 高清晰度 VS Code 风格浅色主题
  const customPythonTheme: { [key: string]: React.CSSProperties } = {
    'code[class*="language-"]': {
      color: '#1e293b',
      fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, Monaco, monospace",
      fontSize: '13px',
      lineHeight: '1.7',
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
    },
    'pre[class*="language-"]': {
      color: '#1e293b',
      fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, Monaco, monospace",
      fontSize: '13px',
      lineHeight: '1.7',
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      margin: 0,
      padding: '18px 22px',
      background: '#fafbfc',
    },
    comment: { color: '#64748b', fontStyle: 'italic' },
    string: { color: '#059669', fontWeight: '500' },
    keyword: { color: '#7c3aed', fontWeight: '700' },
    function: { color: '#2563eb', fontWeight: '600' },
    'class-name': { color: '#d97706', fontWeight: '700' },
    decorator: { color: '#dc2626', fontWeight: '600' },
    builtin: { color: '#0891b2', fontWeight: '600' },
    number: { color: '#d97706' },
    operator: { color: '#475569' },
    punctuation: { color: '#64748b' },
    boolean: { color: '#dc2626', fontWeight: '600' },
  };

  // 渲染单个文件目录树节点
  const renderTreeNode = (file: CodeFile, index: number) => {
    const isActive = activeFileIndex === index;
    const isCompleted = activeFileIndex > index;

    return (
      <div
        key={file.filePath}
        onClick={() => setActiveFileIndex(index)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '7px 10px',
          paddingLeft: file.folder === 'root' ? '12px' : '24px',
          borderRadius: '7px',
          cursor: 'pointer',
          backgroundColor: isActive ? '#eef2ff' : 'transparent',
          borderLeft: isActive ? '3px solid #4f46e5' : '3px solid transparent',
          color: isActive ? '#312e81' : isCompleted ? '#334155' : '#64748b',
          fontSize: '13px',
          fontWeight: isActive ? 700 : 500,
          transition: 'all 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
          margin: '2px 0',
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = '#f1f5f9';
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: '1 1 auto' }}>
          <FileCode
            size={15}
            color={isActive ? '#4f46e5' : isCompleted ? '#10b981' : '#94a3b8'}
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontWeight: isActive ? 700 : 600,
              color: isActive ? '#1e1b4b' : isCompleted ? '#1e293b' : '#334155',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {file.fileName}
          </span>
        </div>

        <span
          style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: isActive ? '#4f46e5' : isCompleted ? '#dcfce7' : '#f1f5f9',
            color: isActive ? '#ffffff' : isCompleted ? '#166534' : '#64748b',
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
            flexShrink: 0,
            marginLeft: '6px',
            border: isCompleted && !isActive ? '1px solid #bbf7d0' : 'none',
          }}
        >
          {isCompleted && !isActive ? '✓ ' + file.stepNum : file.stepNum}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '16px',
        overflow: 'hidden',
        margin: '28px 0',
        boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
      }}
    >
      {/* 顶部工程说明横幅 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 22px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: '#eef2ff',
              color: '#4f46e5',
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid #c7d2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FolderTree size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              AI Agent 生产级工程目录树 (IDE 交互实战)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
              按实际开发顺序循序渐进搭建 7 个模块，观察面向抽象编程与依赖倒置的真实代码演进
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11.5px', color: '#4f46e5', backgroundColor: '#eef2ff', padding: '4px 12px', borderRadius: '9999px', fontWeight: 700, border: '1px solid #c7d2fe' }}>
            🐍 纯 Python 3.11+ 生产级规范
          </span>
        </div>
      </div>

      {/* 主体：左右分栏 IDE 布局 (左侧目录树 + 右侧代码与控制台) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 290px) 1fr',
          minHeight: '540px',
        }}
      >
        {/* 左侧：IDE 目录树侧边栏 (Explorer) */}
        <div
          style={{
            backgroundColor: '#fafbfc',
            borderRight: '1px solid #e2e8f0',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 顶部切步小导航 (固定在目录树上方，展开折叠目录绝不会影响其位置) */}
          <div
            style={{
              paddingBottom: '14px',
              marginBottom: '14px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
              <span style={{ fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Code2 size={13} color="#4f46e5" />
                编码构建流水线
              </span>
              <span style={{ color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
                <strong style={{ color: '#4f46e5', fontWeight: 800 }}>{activeFileIndex + 1}</strong> / {files.length} 步
              </span>
            </div>

            {/* 极简进度条指示器 */}
            <div style={{ width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#4f46e5',
                  borderRadius: '9999px',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveFileIndex((p) => Math.max(0, p - 1))}
                disabled={activeFileIndex === 0}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '7px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: activeFileIndex === 0 ? '#cbd5e1' : '#334155',
                  cursor: activeFileIndex === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                }}
              >
                <ChevronLeft size={14} /> 上一步
              </button>
              <button
                onClick={() => setActiveFileIndex((p) => (p >= files.length - 1 ? 0 : p + 1))}
                style={{
                  flex: 1.2,
                  padding: '7px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 5px rgba(79, 70, 229, 0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{activeFileIndex === files.length - 1 ? '从头重温 ↺' : '下一步 →'}</span>
              </button>
            </div>
          </div>

          {/* 目录树标题 */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              paddingLeft: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FolderOpen size={13} />
              <span>agent_system</span>
            </div>
            <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 600 }}>7 files</span>
          </div>

          {/* 目录树节点 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
            {/* 1. base 目录 */}
            <div>
              <div
                onClick={() => toggleFolder('base')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {openFolders.base ? <ChevronDown size={13} color="#64748b" /> : <ChevronRight size={13} color="#64748b" />}
                  {openFolders.base ? <FolderOpen size={15} color="#d97706" /> : <Folder size={15} color="#d97706" />}
                  <span>base/</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>核心契约层</span>
              </div>
              {openFolders.base && (
                <div style={{ borderLeft: '1px solid #e2e8f0', marginLeft: '12px', paddingLeft: '4px' }}>
                  {renderTreeNode(files[0], 0)} {/* base/agent.py (Step 01) */}
                  {renderTreeNode(files[3], 3)} {/* base/factory.py (Step 04) */}
                </div>
              )}
            </div>

            {/* 2. agents 目录 */}
            <div style={{ marginTop: '3px' }}>
              <div
                onClick={() => toggleFolder('agents')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {openFolders.agents ? <ChevronDown size={13} color="#64748b" /> : <ChevronRight size={13} color="#64748b" />}
                  {openFolders.agents ? <FolderOpen size={15} color="#059669" /> : <Folder size={15} color="#059669" />}
                  <span>agents/</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>具体产品层</span>
              </div>
              {openFolders.agents && (
                <div style={{ borderLeft: '1px solid #e2e8f0', marginLeft: '12px', paddingLeft: '4px' }}>
                  {renderTreeNode(files[1], 1)} {/* agents/code_agent.py (Step 02) */}
                  {renderTreeNode(files[2], 2)} {/* agents/research_agent.py (Step 03) */}
                </div>
              )}
            </div>

            {/* 3. factories 目录 */}
            <div style={{ marginTop: '3px' }}>
              <div
                onClick={() => toggleFolder('factories')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {openFolders.factories ? <ChevronDown size={13} color="#64748b" /> : <ChevronRight size={13} color="#64748b" />}
                  {openFolders.factories ? <FolderOpen size={15} color="#4f46e5" /> : <Folder size={15} color="#4f46e5" />}
                  <span>factories/</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>具体工厂层</span>
              </div>
              {openFolders.factories && (
                <div style={{ borderLeft: '1px solid #e2e8f0', marginLeft: '12px', paddingLeft: '4px' }}>
                  {renderTreeNode(files[4], 4)} {/* factories/code_factory.py (Step 05) */}
                  {renderTreeNode(files[5], 5)} {/* factories/research_factory.py (Step 06) */}
                </div>
              )}
            </div>

            {/* 4. 根文件 main.py */}
            <div style={{ marginTop: '3px', borderLeft: '1px solid transparent', marginLeft: '12px', paddingLeft: '4px' }}>
              {renderTreeNode(files[6], 6)} {/* main.py (Step 07) */}
            </div>
          </div>
        </div>

        {/* 右侧：代码编辑器 + 讲解 + 终端 */}
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
          {/* 面包屑与顶部操作栏 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 18px',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '12.5px',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {/* 面包屑 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
              <span style={{ color: '#64748b' }}>agent_system</span>
              <ChevronRight size={13} color="#94a3b8" />
              {currentFile.folder !== 'root' && (
                <>
                  <span style={{ color: '#64748b' }}>{currentFile.folder}</span>
                  <ChevronRight size={13} color="#94a3b8" />
                </>
              )}
              <span style={{ color: '#0f172a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FileCode size={14} color="#4f46e5" />
                {currentFile.fileName}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  color: copied ? '#059669' : '#334155',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                <span>{copied ? '已复制！' : '复制代码'}</span>
              </button>
            </div>
          </div>

          {/* 当前文件开发顺序与原因横幅 */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#fafbfc',
              borderBottom: '1px solid #e2e8f0',
              borderLeft: '4px solid #4f46e5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#4f46e5', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                {currentFile.stepNum}
              </span>
              <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#0f172a' }}>
                {currentFile.stepTitle}
              </span>
              <span style={{ fontSize: '11.5px', color: '#4f46e5', backgroundColor: '#eef2ff', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600, border: '1px solid #c7d2fe' }}>
                {currentFile.roleType}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
              {currentFile.devReason}
            </p>
          </div>

          {/* 代码视口 */}
          <div style={{ flex: 1, overflowX: 'auto', backgroundColor: '#fafbfc' }}>
            <SyntaxHighlighter
              language="python"
              style={customPythonTheme}
              showLineNumbers={true}
              wrapLines={true}
              lineNumberStyle={{
                minWidth: '2.5em',
                paddingRight: '1em',
                color: '#94a3b8',
                textAlign: 'right',
                userSelect: 'none',
              }}
              customStyle={{
                margin: 0,
                padding: '18px 22px',
                backgroundColor: 'transparent',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, Monaco, monospace",
                lineHeight: '1.7',
              }}
            >
              {currentFile.code}
            </SyntaxHighlighter>
          </div>

          {/* 底部终端运行控制台 */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderTop: '1px solid #1e293b',
              padding: '14px 18px',
              color: '#f8fafc',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: '11.5px', color: '#94a3b8', marginLeft: '6px', fontWeight: 600 }}>TERMINAL / 运行验证</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {terminalLogs.length > 0 && (
                  <button
                    onClick={() => setTerminalLogs([])}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'transparent',
                      color: '#94a3b8',
                      border: '1px solid #334155',
                      borderRadius: '5px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={11} />
                    <span>清屏</span>
                  </button>
                )}
                <button
                  onClick={handleRunMainPy}
                  disabled={terminalRunning}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 14px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: terminalRunning ? 'not-allowed' : 'pointer',
                    opacity: terminalRunning ? 0.7 : 1,
                    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.35)',
                  }}
                >
                  <Play size={12} />
                  <span>{terminalRunning ? '执行中...' : '点击运行 python main.py'}</span>
                </button>
              </div>
            </div>

            {terminalLogs.length === 0 ? (
              <div style={{ color: '#64748b', fontStyle: 'italic', padding: '4px 0' }}>
                # 点击右上角「点击运行 python main.py」按钮，观察各个文件组装后的完整控制台执行日志...
              </div>
            ) : (
              <div style={{ lineHeight: '1.65', maxHeight: '160px', overflowY: 'auto' }}>
                {terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    style={{
                      color: log.startsWith('$')
                        ? '#38bdf8'
                        : log.includes('🛡️')
                        ? '#c084fc'
                        : log.includes('💻') || log.includes('🔍')
                        ? '#4ade80'
                        : '#e2e8f0',
                    }}
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
