import React, { useEffect, useState } from 'react';
import { Eye, Users } from 'lucide-react';

// 单例数据存储，避免多组件重复触发与状态不一致
let globalPv: string | null = null;
let globalUv: string | null = null;
const listeners = new Set<(data: { pv: string | null; uv: string | null }) => void>();

function notify(pv: string | null, uv: string | null) {
  globalPv = pv;
  globalUv = uv;
  listeners.forEach((fn) => fn({ pv, uv }));
}

let initialized = false;

function initBusuanzi() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  try {
    // 确保隐藏挂载容器存在
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
      try {
        const pvText = pvHidden?.innerText?.trim();
        const uvText = uvHidden?.innerText?.trim();
        if (pvText || uvText) {
          notify(pvText || globalPv, uvText || globalUv);
        }
      } catch (err) {
        console.warn('[Busuanzi] update error:', err);
      }
    };

    updateValues();

    if (pvHidden || uvHidden) {
      const observer = new MutationObserver(() => {
        updateValues();
      });
      if (pvHidden) {
        observer.observe(pvHidden, { childList: true, characterData: true, subtree: true });
      }
      if (uvHidden) {
        observer.observe(uvHidden, { childList: true, characterData: true, subtree: true });
      }
    }

    // 检查是否已存在不蒜子脚本
    const existingScript = document.querySelector('script[src*="busuanzi"]') as HTMLScriptElement | null;
    const bszCaller = (window as unknown as { bszCaller?: { fetch?: (url: string, cb: (data: unknown) => void) => void } }).bszCaller;
    const bszTag = (window as unknown as { bszTag?: { texts: (data: unknown) => void; shows: () => void } }).bszTag;

    if (bszCaller && typeof bszCaller.fetch === 'function' && bszTag) {
      try {
        bszCaller.fetch('//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback', (data: unknown) => {
          bszTag.texts(data);
          bszTag.shows();
          updateValues();
        });
      } catch (e) {
        console.warn('[Busuanzi] fetch error:', e);
      }
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'busuanzi-script';
      script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
      script.async = true;
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.onerror = () => {
        console.warn('[Busuanzi] Script failed to load (possibly blocked by Adblocker)');
      };
      document.head.appendChild(script);
    }
  } catch (e) {
    console.warn('[Busuanzi] Initialization error:', e);
  }
}

/**
 * 自定义 Hook: 监听与获取不蒜子 (Busuanzi) 统计数据
 * 采用隐藏挂载节点 + MutationObserver + 全局单例广播，防崩溃且完美适配 React SPA
 */
export const useVisitorStats = () => {
  const [stats, setStats] = useState<{ pv: string | null; uv: string | null }>({
    pv: globalPv,
    uv: globalUv,
  });

  useEffect(() => {
    initBusuanzi();

    const listener = (newStats: { pv: string | null; uv: string | null }) => {
      setStats(newStats);
    };
    listeners.add(listener);

    if (globalPv !== stats.pv || globalUv !== stats.uv) {
      setStats({ pv: globalPv, uv: globalUv });
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return stats;
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
