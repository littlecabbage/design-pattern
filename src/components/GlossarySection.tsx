import React, { useState } from 'react';
import { BookOpen, Sparkles, Search, CheckCircle } from 'lucide-react';

interface GlossaryItem {
  term: string;
  en: string;
  academic: string;
  plainAnalogy: string;
}

export const GlossarySection: React.FC = () => {
  const [filter, setFilter] = useState('');

  const terms: GlossaryItem[] = [
    {
      term: '抽象类',
      en: 'Abstract Class',
      academic: '包含一个或多个抽象方法（未给出具体代码实现）的基类，不能被直接实例化（不能直接 new）。',
      plainAnalogy: '抽象类是包含规则但未完全完工的基类。如果你不理解，你就理解为：一张盖了公章的「半成品汽车设计图纸」——它已经写好了一些通用规矩（如安全检查），但把发动机怎么装留给分厂去填空，你绝对不能直接把一张图纸当真车开上路。',
    },
    {
      term: '接口',
      en: 'Interface',
      academic: '只声明方法名称、参数与返回值规范，完全不包含任何具体实现的纯契约协议。',
      plainAnalogy: '接口是纯粹的契约规范。如果你不理解，你就理解为：「墙上的国标五孔电源插座标准」——它强制规定插头必须是三脚或两脚，但插座内部完全不管你后面插的是电视机、吹风机还是电饭煲。',
    },
    {
      term: '具体类 / 具体产品',
      en: 'Concrete Class / Product',
      academic: '实现了所有抽象方法、可以直接通过 new 关键字在计算机内存中创建出实体的完整代码类。',
      plainAnalogy: '具体类是真正拥有所有零部件的实体。如果你不理解，你就理解为：「真正开出厂房的特斯拉或保时捷实车」——所有电路、轮胎安装完毕，插上钥匙踩油门就能在马路上跑。',
    },
    {
      term: '实例化 / new',
      en: 'Instantiation',
      academic: '根据类（Class）的蓝图定义，在计算机内存中分配空间并初始化出一个活生生的对象（Object）的过程。',
      plainAnalogy: '实例化是把图纸造出实物的过程。如果你不理解，你就理解为：「照着乐高说明书真正把积木拼成拿在手里的城堡玩具」。说明书是类，拼好的积木玩具就是实例。',
    },
    {
      term: '多态',
      en: 'Polymorphism',
      academic: '同一抽象接口在运行时由具体子类对象决定具体的执行行为，实现“同一调用，不同表现”。',
      plainAnalogy: '多态是同一个指令在不同对象身上有不同反应。如果你不理解，你就理解为：「班主任在讲台上喊一声‘同学们开始写作业’」——数学课代表掏出草稿纸算高数，语文课代表开始默写古诗，大家响应的是同一个口令，但做的动作截然不同。',
    },
    {
      term: '解耦',
      en: 'Decoupling',
      academic: '降低不同模块之间的紧密依赖度，使一个模块的内部重构或扩展不会破坏其他模块的稳定运行。',
      plainAnalogy: '解耦是让模块之间不要黏死在一起。如果你不理解，你就理解为：「电脑的 Type-C 拓展坞」——你换一个新鼠标只需拔插接口，绝不需要拿电烙铁把主板拆开重焊一遍。',
    },
    {
      term: '工厂方法模式',
      en: 'Factory Method Pattern',
      academic: '定义一个用于创建对象的接口，但让子类决定实例化哪一个类，将对象的实例化延迟到其子类中完成。',
      plainAnalogy: '工厂方法是把繁琐的造物工作下放给专业代工厂。如果你不理解，你就理解为：总公司下达「交付一辆车」的指标，但总公司不亲自拧螺丝，而是交给「纯电车分厂」或「燃油车分厂」去各自组装交付。',
    },
    {
      term: '开闭原则 (OCP)',
      en: 'Open-Closed Principle',
      academic: '软件实体应当对扩展开放 (Open for extension)，对修改关闭 (Closed for modification)。',
      plainAnalogy: '开闭原则是想要新功能只加新代码，不改老代码。如果你不理解，你就理解为：「智能手机安装新 App」——你想玩新游戏去应用商店下载即可，绝不需要拿螺丝刀拆开手机芯片去改主板线路。',
    },
    {
      term: '单一职责原则 (SRP)',
      en: 'Single Responsibility Principle',
      academic: '一个类应该仅有一个引起它发生变化的原因，专注于做好一件独立的事情。',
      plainAnalogy: '单一职责是专人专事。如果你不理解，你就理解为：「饭店里的厨师只管炒好菜」——千万别让厨师既炒菜又当迎宾收银员还兼职修厕所下水道，否则厨房一忙全店瘫痪。',
    },
    {
      term: '依赖倒置原则 (DIP)',
      en: 'Dependency Inversion Principle',
      academic: '高层模块与底层模块都应当依赖于抽象接口，而不是互相直接依赖具体的实现细节。',
      plainAnalogy: '依赖倒置是大家一起认标准。如果你不理解，你就理解为：「全世界的充电器和插座都认 Type-C 协议」——手机厂商和充电宝厂商都面向 Type-C 接口开发，谁也不用直接依赖对方的具体电路设计。',
    },
    {
      term: 'AI Agent (智能体)',
      en: 'Artificial Intelligence Agent',
      academic: '以大语言模型为核心大脑，具备环境自主感知、上下文记忆规划与外部工具调用链的自动化智能实体。',
      plainAnalogy: 'AI Agent 是懂电脑的虚拟数字员工。如果你不理解，你就理解为：「你招聘了一个高级助理」——你只需说‘帮我分析今年财报’，它自己上网查资料、自己打开 Python 算数据并把表格画好交给你。',
    },
  ];

  const filteredTerms = terms.filter(
    (t) =>
      t.term.includes(filter) ||
      t.en.toLowerCase().includes(filter.toLowerCase()) ||
      t.plainAnalogy.includes(filter)
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        margin: '28px 0',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#eef2ff', color: '#4f46e5', padding: '6px', borderRadius: '8px' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
              💡 初学者通俗概念大白话速查字典
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
              拒绝生涩术语！所有概念均配备「xxx是xxx，如果你不理解，你就理解为xxx」的通俗对照
            </p>
          </div>
        </div>

        {/* 搜索框 */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="搜索概念（如：抽象类、多态、OCP）..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '6px 12px 6px 30px',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              fontSize: '12.5px',
              outline: 'none',
              width: '240px',
            }}
          />
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#fafbfc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#0f172a' }}>
                  {item.term}
                </span>
                <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#64748b', backgroundColor: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
                  {item.en}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', lineHeight: '1.5' }}>
                <strong>学术定义：</strong>{item.academic}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#eef2ff',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '12.5px',
                color: '#312e81',
                lineHeight: '1.55',
              }}
            >
              <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px' }}>
                <Sparkles size={13} />
                <span>通俗大白话：</span>
              </div>
              <div>{item.plainAnalogy}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
