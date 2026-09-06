import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Scale,
  Compass,
  Lightbulb,
  Box,
  Copy,
  Sliders,
  Flame,
  Check
} from 'lucide-react';

interface CreationalPatternCompareRow {
  seq: string;
  id: string;
  name: string;
  nameEn: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  philosophy: string;
  mechanism: string;
  granularity: string;
  agentCase: string;
  pros: string;
  cons: string;
  heuristic: string;
  url: string;
  tag: string;
}

const CREATIONAL_PATTERNS_COMPARE_DATA: CreationalPatternCompareRow[] = [
  {
    seq: '01',
    id: 'factory-method',
    name: '工厂方法模式',
    nameEn: 'Factory Method',
    themeColor: '#4f46e5',
    themeBg: '#eef2ff',
    themeBorder: '#c7d2fe',
    philosophy: '定义创建对象的抽象接口，由子类多态决定实例化哪一个具体类。将对象的创建与业务调度彻底解耦。',
    mechanism: '类级别继承多态',
    granularity: '单一独立产品（一步到位生成）',
    agentCase: 'CodeAgent (代码沙箱) 与 ResearchAgent (向量研报) 的动态生命周期流水线多态分发',
    pros: '严格符合开闭原则，新增 Agent 类型无需改动主调度引擎；客户端只依赖抽象接口。',
    cons: '每增加一个具体产品都必须配对增加一个具体工厂类，可能导致类数量急剧增加。',
    heuristic: '“单一产品要多态，子类工厂来定裁” —— 适用于依赖多态动态产生不同单一业务对象的场景。',
    url: './design-pattern-html/01-creational/01-factory-method-pattern.html',
    tag: '多态创建 · 解耦生命周期',
  },
  {
    seq: '02',
    id: 'abstract-factory',
    name: '抽象工厂模式',
    nameEn: 'Abstract Factory',
    themeColor: '#d97706',
    themeBg: '#fffbeb',
    themeBorder: '#fde68a',
    philosophy: '提供创建一系列相关或相互依赖对象的接口，无需指定具体类。成套生产整套协同生态，杜绝混搭事故。',
    mechanism: '对象组合族化模式',
    granularity: '产品族生态套件（多组件成套协同）',
    agentCase: '本地涉密隔离栈 (Ollama + SQLite + Docker) vs 云端高并发栈 (OpenAI + Milvus + MicroVM) 零感整套切换',
    pros: '保证同生态产品协同一致性，杜绝本地模型误调云端存储等混搭风险；方便整套技术栈热插拔。',
    cons: '开闭原则具倾斜性：新增产品族容易，但在所有族中新增一种产品零件需要修改所有工厂接口。',
    heuristic: '“产品家族套件化，生态协同不混搭” —— 适用于需要成套生产多维度协同组件的系统生态。',
    url: './design-pattern-html/01-creational/02-abstract-factory-pattern.html',
    tag: '产品族生态 · 杜绝混搭事故',
  },
  {
    seq: '03',
    id: 'singleton',
    name: '单例模式',
    nameEn: 'Singleton',
    themeColor: '#0284c7',
    themeBg: '#f0f9ff',
    themeBorder: '#bae6fd',
    philosophy: '保证一个类仅有一个实例，并提供一个访问它的全局唯一访问点。严格管控高开销资源与并发竞争。',
    mechanism: '构造私有化 + 双检锁',
    granularity: '进程级全局唯一实例（共享复用）',
    agentCase: 'Agent 集中式 Token 计量计费网关、全局 Embedding 向量缓存管理器与线程安全审计中心',
    pros: '避免重复初始化开销，集中控制对受限硬件/网络连接池的访问，提供唯一的系统度量标尺。',
    cons: '引入全局状态隐式依赖，增加模块耦合，违反单一职责原则，单元测试中难以被隔离与 Mock。',
    heuristic: '“稀缺资源全局控，唯有一身省开销” —— 适用于全局唯一配置、计量、驱动或受限资源池。',
    url: './design-pattern-html/01-creational/03-singleton-pattern.html',
    tag: '全局唯一 · 资源集中管控',
  },
  {
    seq: '04',
    id: 'builder',
    name: '建造者模式',
    nameEn: 'Builder',
    themeColor: '#059669',
    themeBg: '#ecfdf5',
    themeBorder: '#a7f3d0',
    philosophy: '将一个复杂对象的构建过程与它的表示分离，使得同样的构建过程可以创建不同的表示。',
    mechanism: '分步装配 + 链式流水线',
    granularity: '多零件复杂组装体（细粒度按需装配）',
    agentCase: '复杂 Agent 执行管线装配器 (模型基座 + Prompt 模板 + 工具集注入 + 记忆窗口 + 权限策略 + Guardrails)',
    pros: '精细化控制装配步骤与顺序，代码可读性极高 (Fluent API)；构造参数过多时不依赖冗长参数列表。',
    cons: '需要额外编写专门的 Builder 与 Director 结构；如果产品本身内部构造简单，容易导致过度工程。',
    heuristic: '“复杂对象零件多，精细组装按部做” —— 适用于构造参数超过 4 个且需分步配置组装的复杂对象。',
    url: './design-pattern-html/01-creational/04-builder-pattern.html',
    tag: '精细装配 · 链式流水线',
  },
  {
    seq: '05',
    id: 'prototype',
    name: '原型模式',
    nameEn: 'Prototype',
    themeColor: '#7c3aed',
    themeBg: '#f5f3ff',
    themeBorder: '#ddd6fe',
    philosophy: '用原型实例指定创建对象的种类，通过拷贝这些原型创建新对象，绕过昂贵的初始化流程支持分叉演进。',
    mechanism: '内存克隆 (深拷贝/快照分叉)',
    granularity: '既有状态的衍生分支副本（微秒级克隆）',
    agentCase: '智能体思维链分支演化 (Tree-of-Thought / ToT) 的上下文环境状态深度克隆与并发沙箱回溯推演',
    pros: '微秒级深克隆生成新分支，极大节省重型资源初始化时间；天然适配探索式搜索与状态时光倒流。',
    cons: '深浅拷贝机制复杂，若对象包含底层 Socket 连接、循环引用或外部系统句柄，易引发内存与状态污染。',
    heuristic: '“深克隆分叉快照，省却初始化煎熬” —— 适用于实例初始化昂贵、或需要保留中间态分叉探索的场景。',
    url: './design-pattern-html/01-creational/05-prototype-pattern.html',
    tag: '克隆复制 · 状态快照分叉',
  },
];

export const CreationalComparisonTable: React.FC = () => {
  const [copiedHeuristic, setCopiedHeuristic] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHeuristic(id);
    setTimeout(() => setCopiedHeuristic(null), 2000);
  };

  return (
    <section
      id="creational-comparison-matrix"
      style={{
        marginTop: '60px',
        animation: 'fadeInUp 0.4s ease-out forwards',
      }}
    >
      {/* 头部装饰横幅 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1.5px solid #c7d2fe',
          borderRadius: '20px',
          padding: '24px 28px',
          boxShadow: '0 10px 30px -5px rgba(79, 70, 229, 0.08)',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #4f46e5, #06b6d4, #10b981)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
              <Scale size={14} />
              <span>GoF 架构师选型决策雷盘 · 创建型五大金刚横向对比</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              5 种创建型设计模式终极全景深度对比
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0, maxWidth: '850px', lineHeight: 1.65 }}>
              创建型模式（Creational Patterns）的精髓在于<strong>抽象对象的实例化过程</strong>，将系统与对象如何创建、组合和表示解耦。
              以下横向矩阵从<strong>设计哲学、创建机制、AI Agent 落地实践、架构权衡与极速选型口诀</strong> 5 大维度为您清晰呈现各模式的边界与取舍。
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <CheckCircle2 size={14} />
              5 门课件全部上线
            </span>
          </div>
        </div>
      </div>

      {/* 核心对比表格主体 */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
          overflow: 'hidden',
          marginBottom: '28px',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '13.5px',
              lineHeight: 1.6,
            }}
          >
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#1e293b', width: '180px', minWidth: '170px' }}>
                  模式名称
                </th>
                <th style={{ padding: '16px 18px', fontWeight: 800, color: '#1e293b', width: '220px', minWidth: '200px' }}>
                  核心哲学与设计宗旨
                </th>
                <th style={{ padding: '16px 18px', fontWeight: 800, color: '#1e293b', width: '190px', minWidth: '180px' }}>
                  创建机制与产出粒度
                </th>
                <th style={{ padding: '16px 18px', fontWeight: 800, color: '#1e293b', width: '260px', minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Cpu size={14} color="#4f46e5" />
                    <span>AI Agent 工业落地范式</span>
                  </div>
                </th>
                <th style={{ padding: '16px 18px', fontWeight: 800, color: '#1e293b', width: '250px', minWidth: '230px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Scale size={14} color="#059669" />
                    <span>架构收益 vs 潜在成本</span>
                  </div>
                </th>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#1e293b', width: '220px', minWidth: '200px' }}>
                  一句话决策口诀
                </th>
                <th style={{ padding: '16px 16px', fontWeight: 800, color: '#1e293b', width: '110px', minWidth: '100px', textAlign: 'center' }}>
                  课件直达
                </th>
              </tr>
            </thead>
            <tbody>
              {CREATIONAL_PATTERNS_COMPARE_DATA.map((row, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: idx === CREATIONAL_PATTERNS_COMPARE_DATA.length - 1 ? 'none' : '1px solid #f1f5f9',
                      background: isEven ? '#fafbfc' : '#ffffff',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8faff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isEven ? '#fafbfc' : '#ffffff';
                    }}
                  >
                    {/* 模式名称与编号 */}
                    <td style={{ padding: '18px 20px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: row.themeColor,
                            background: row.themeBg,
                            border: `1px solid ${row.themeBorder}`,
                            padding: '1px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          #{row.seq}
                        </span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
                        {row.name}
                      </div>
                      <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#64748b', marginBottom: '8px' }}>
                        {row.nameEn}
                      </div>
                      <div
                        style={{
                          display: 'inline-block',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: row.themeColor,
                          background: row.themeBg,
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {row.tag}
                      </div>
                    </td>

                    {/* 核心哲学与意图 */}
                    <td style={{ padding: '18px 18px', verticalAlign: 'top', color: '#334155', fontSize: '13px' }}>
                      {row.philosophy}
                    </td>

                    {/* 创建机制与粒度 */}
                    <td style={{ padding: '18px 18px', verticalAlign: 'top' }}>
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b' }}>机制：</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{row.mechanism}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b' }}>粒度：</span>
                        <span style={{ fontSize: '12.5px', color: '#475569' }}>{row.granularity}</span>
                      </div>
                    </td>

                    {/* AI Agent 落地范式 */}
                    <td style={{ padding: '18px 18px', verticalAlign: 'top' }}>
                      <div
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          fontSize: '12.5px',
                          color: '#334155',
                          lineHeight: 1.55,
                        }}
                      >
                        {row.agentCase}
                      </div>
                    </td>

                    {/* 架构收益 vs 成本 */}
                    <td style={{ padding: '18px 18px', verticalAlign: 'top', fontSize: '12.5px', lineHeight: 1.55 }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle2 size={12} />
                          收益：
                        </strong>
                        <span style={{ color: '#334155' }}>{row.pros}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <ShieldCheck size={12} />
                          代价：
                        </strong>
                        <span style={{ color: '#64748b' }}>{row.cons}</span>
                      </div>
                    </td>

                    {/* 决策口诀 */}
                    <td style={{ padding: '18px 20px', verticalAlign: 'top' }}>
                      <div
                        style={{
                          background: row.themeBg,
                          border: `1px dashed ${row.themeBorder}`,
                          borderRadius: '8px',
                          padding: '10px 12px',
                          fontSize: '12.5px',
                          color: '#1e293b',
                          fontWeight: 600,
                          position: 'relative',
                        }}
                      >
                        <div>{row.heuristic}</div>
                        <button
                          onClick={() => handleCopy(row.heuristic, row.id)}
                          title="复制口诀"
                          style={{
                            marginTop: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            color: '#475569',
                            cursor: 'pointer',
                          }}
                        >
                          {copiedHeuristic === row.id ? (
                            <>
                              <Check size={11} color="#16a34a" />
                              <span style={{ color: '#16a34a' }}>已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>复制</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* 课件直达 */}
                    <td style={{ padding: '18px 16px', verticalAlign: 'top', textAlign: 'center' }}>
                      <a
                        href={row.url}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '8px 12px',
                          background: row.themeColor,
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: `0 2px 6px ${row.themeColor}33`,
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = `0 4px 10px ${row.themeColor}55`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 2px 6px ${row.themeColor}33`;
                        }}
                      >
                        <span>研读</span>
                        <ArrowRight size={13} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 架构师 5 秒极速选型决策树辅助卡片 */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>
          <Lightbulb size={18} color="#f59e0b" />
          <span>架构师实战决策树：5 秒选型思维流 (Decision Flowchart)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #4f46e5', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px' }}>情况 1：依赖多态生成单一类？</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5' }}>👉 工厂方法 (Factory Method)</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #d97706', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px' }}>情况 2：成套生成同一技术生态族？</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#d97706' }}>👉 抽象工厂 (Abstract Factory)</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #0284c7', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px' }}>情况 3：稀缺资源全局唯一且跨模块？</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0284c7' }}>👉 单例模式 (Singleton)</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #059669', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px' }}>情况 4：超 4 个参数需精细化装配？</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>👉 建造者模式 (Builder)</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #7c3aed', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '3px' }}>情况 5：初始化代价极高需快照分叉？</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#7c3aed' }}>👉 原型模式 (Prototype)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
