import React, { useEffect, useState } from 'react';
import { Eye, Users } from 'lucide-react';

/**
 * 自定义 Hook: 监听与获取不蒜子 (Busuanzi) 统计数据
 * 采用隐藏挂载节点 + MutationObserver，完美兼容 React SPA 异步渲染，杜绝传统 ID 冲突。
 */
export const useVisitorStats = () => {
  const [pv, setPv] = useState<string | null>(null);
  const [uv, setUv] = useState<string | null>(null);

  useEffect(() => {
    // 确保隐藏容器存在
    let container = document.getElementById('__busuanzi_hidden_container');
    let pvHidden = document.getElementById('busuanzi_value_site_pv');
    let uvHidden = document.getElementById('busuanzi_value_site_uv');

    if (!container) {
      container = document.createElement('div');
      container.id = '__busuanzi_hidden_container';
      container.style.display = 'none';

      if (!pvHidden) {
        pvHidden = document.createElement('span');
        pvHidden.id = 'busuanzi_value_site_pv';
        container.appendChild(pvHidden);
      }
      if (!uvHidden) {
        uvHidden = document.createElement('span');
        uvHidden.id = 'busuanzi_value_site_uv';
        container.appendChild(uvHidden);
      }
      document.body.appendChild(container);
    }

    const updateValues = () => {
      if (pvHidden && pvHidden.innerText && pvHidden.innerText.trim() !== '') {
        setPv(pvHidden.innerText.trim());
      }
      if (uvHidden && uvHidden.innerText && uvHidden.innerText.trim() !== '') {
        setUv(uvHidden.innerText.trim());
      }
    };

    updateValues();

    const observer = new MutationObserver(() => {
      updateValues();
    });

    if (pvHidden) {
      observer.observe(pvHidden, { childList: true, characterData: true, subtree: true });
    }
    if (uvHidden) {
      observer.observe(uvHidden, { childList: true, characterData: true, subtree: true });
    }

    // 动态注入不蒜子核心脚本
    const scriptId = 'busuanzi-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      const bsz = (window as unknown as { bszCaller?: { fetch?: () => void } }).bszCaller;
      if (bsz && typeof bsz.fetch === 'function') {
        bsz.fetch();
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { pv, uv };
};

/**
 * 顶部导航栏精致访客胶囊徽章
 */
export const HeaderVisitorBadge: React.FC = () => {
  const { pv, uv } = useVisitorStats();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        fontWeight: 600,
        color: '#475569',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        padding: '5px 12px',
        borderRadius: '9999px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
        transition: 'all 0.2s',
      }}
      title="全站访客实时统计"
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          display: 'inline-block',
          boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Eye size={12} color="#64748b" />
        <span style={{ color: '#64748b' }}>访问量</span>
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 700,
            color: '#4f46e5',
            minWidth: '16px',
            textAlign: 'center',
          }}
        >
          {pv || '...'}
        </span>
      </div>

      <span style={{ color: '#cbd5e1' }}>|</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Users size={12} color="#64748b" />
        <span style={{ color: '#64748b' }}>访客</span>
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 700,
            color: '#059669',
            minWidth: '16px',
            textAlign: 'center',
          }}
        >
          {uv || '...'}
        </span>
      </div>
    </div>
  );
};

/**
 * 底部页脚统计卡片
 */
export const FooterVisitorStats: React.FC = () => {
  const { pv, uv } = useVisitorStats();

  return (
    <div
      style={{
        marginTop: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12.5px',
        color: '#64748b',
        background: '#f8fafc',
        padding: '6px 18px',
        borderRadius: '9999px',
        border: '1px solid #e2e8f0',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <span>👀 站点总访问量</span>
        <span
          style={{
            fontWeight: 700,
            color: '#4f46e5',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {pv || '加载中...'}
        </span>
        <span>次</span>
      </span>

      <span style={{ color: '#cbd5e1' }}>•</span>

      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <span>👤 独立访客总数</span>
        <span
          style={{
            fontWeight: 700,
            color: '#059669',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {uv || '加载中...'}
        </span>
        <span>人</span>
      </span>
    </div>
  );
};
