import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QuizCard: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      question: '1. 在 UML 类图中，一条“带空心三角形的虚线 (╌╌▷)”表示什么关系？',
      options: [
        'A. 类的继承泛化 (Inheritance/Generalization)',
        'B. 接口的实现 (Realization/Implementation)',
        'C. 类的关联依赖 (Dependency)',
        'D. 整体与部分的组合聚合 (Composition)',
      ],
      correctIndex: 1,
      explanation: '带空心三角的虚线代表接口的实现 (Realization)；实线+空心三角才代表类的继承泛化 (Generalization)。',
    },
    {
      id: 2,
      question: '2. 相比于“简单工厂 (Simple Factory)”，“工厂方法模式 (Factory Method)”最大的核心改进是？',
      options: [
        'A. 运行效率更快，省去了动态函数分发开销',
        'B. 将所有对象的创建逻辑强行集中在一个静态方法中',
        'C. 彻底践行开闭原则 (OCP)，新增产品时通过新增子工厂扩展，无须修改旧代码',
        'D. 极大减少了系统中的类文件总数',
      ],
      correctIndex: 2,
      explanation: '简单工厂在每次新增产品时都必须修改内部 if-else 分支；而工厂方法模式将创建推迟到具体工厂子类中，遵循开闭原则 (OCP)。',
    },
    {
      id: 3,
      question: '3. 在我们构建的 AI Agent 系统中，调度器客户端 client_orchestrator 应该依赖哪个类型？',
      options: [
        'A. 必须直接依赖 CodeAgentFactory 和 CodeAgent 实例',
        'B. 只依赖抽象工厂基类 AgentFactory 和抽象产品接口 Agent',
        'C. 直接使用 switch-case 手工实例化所有 Agent',
        'D. 依赖具体的沙箱端口号和环境变量',
      ],
      correctIndex: 1,
      explanation: '这正是依赖倒置原则 (DIP) 的精髓：高层模块与底层模块都面向抽象接口编程，实现解耦。',
    },
  ];

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showScore, setShowScore] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number, correctIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));

    if (optionIdx === correctIdx) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const score = Object.keys(answers).reduce((acc, qId) => {
    const q = questions.find((item) => item.id === Number(qId));
    if (q && answers[Number(qId)] === q.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={20} color="#4f46e5" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
            3 分钟架构知识极速巩固
          </h3>
        </div>
        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          已答: {Object.keys(answers).length} / {questions.length} | 得分: {score * 33 + (score === 3 ? 1 : 0)} 分
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {questions.map((q) => {
          const selected = answers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                {q.question}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, idx) => {
                  let btnBg = '#f8fafc';
                  let btnBorder = '#e2e8f0';
                  let btnColor = '#334155';

                  if (isAnswered) {
                    if (idx === q.correctIndex) {
                      btnBg = '#ecfdf5';
                      btnBorder = '#10b981';
                      btnColor = '#065f46';
                    } else if (idx === selected) {
                      btnBg = '#fff1f2';
                      btnBorder = '#e11d48';
                      btnColor = '#9f1239';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(q.id, idx, q.correctIndex)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: `1.5px solid ${btnBorder}`,
                        backgroundColor: btnBg,
                        color: btnColor,
                        textAlign: 'left',
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                        fontWeight: idx === selected ? 600 : 400,
                      }}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === q.correctIndex && <CheckCircle2 size={16} color="#059669" />}
                      {isAnswered && idx === selected && idx !== q.correctIndex && <XCircle size={16} color="#e11d48" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isCorrect ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${isCorrect ? '#a7f3d0' : '#fde68a'}`,
                    fontSize: '13px',
                    color: isCorrect ? '#065f46' : '#92400e',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <strong>{isCorrect ? '🎉 答对啦！' : '💡 解析：'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {score === 3 && (
        <div
          style={{
            marginTop: '24px',
            padding: '20px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #eef2ff 100%)',
            border: '1px solid #6ee7b7',
            textAlign: 'center',
          }}
        >
          <Award size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#064e3b', marginBottom: '4px' }}>
            🏆 满分通关！你已经完全掌握了工厂方法模式！
          </h4>
          <p style={{ fontSize: '13.5px', color: '#047857' }}>
            你已经理解了面向对象多态、开闭原则 (OCP) 以及面向接口解耦的架构心法。
          </p>
        </div>
      )}
    </div>
  );
};
