import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / windowHeight) * 100;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #4f46e5, #06b6d4, #10b981)',
        zIndex: 1000,
        transition: 'width 0.1s ease',
      }}
    />
  );
};

export const Navbar: React.FC = () => {
  return (
    <header
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 900,
        maxWidth: '1140px',
        margin: '16px auto 0',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '9999px',
          padding: '8px 20px',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        }}
      >
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '14px',
            color: '#0f172a',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={11} />
            <span>GoF</span>
          </span>
          <span>工厂方法模式 · 架构教学</span>
        </a>

        <ul className="nav-links-desktop">
          <li><a href="#section-intro" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>1. 痛点起因</a></li>
          <li><a href="#section-uml" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>2. UML 规范</a></li>
          <li><a href="#section-core" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>3. 四大角色</a></li>
          <li><a href="#section-code" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>4. 代码与时序</a></li>
          <li><a href="#section-lab" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>5. 仿真实验</a></li>
          <li><a href="#section-quiz" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>6. 即学即测</a></li>
        </ul>
      </div>
    </header>
  );
};
