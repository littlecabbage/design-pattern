import React, { useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

interface TermBadgeProps {
  term: string;
  definition: string;
  fullName?: string;
  analogy?: string; // “如果你不理解，你就理解为...”
}

export const TermBadge: React.FC<TermBadgeProps> = ({ term, definition, fullName, analogy }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-md text-sm font-semibold cursor-help transition-all duration-200"
      style={{
        backgroundColor: '#eef2ff',
        color: '#4f46e5',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        verticalAlign: 'baseline',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <span>{term}</span>
      <HelpCircle size={13} className="opacity-70" />

      {showTooltip && (
        <span
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-3.5 text-xs leading-relaxed rounded-xl shadow-2xl transition-all duration-200 pointer-events-none text-left"
          style={{
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.3), 0 8px 10px -6px rgba(15, 23, 42, 0.2)',
          }}
        >
          {fullName && (
            <span className="block font-bold text-indigo-300 mb-1 text-[12px] border-b border-slate-700 pb-1">
              {fullName}
            </span>
          )}
          
          <div className="mb-2 text-slate-200">
            <span className="text-slate-400 font-semibold">【专业定义】</span>
            <span>{definition}</span>
          </div>

          {analogy && (
            <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-amber-200">
              <span className="font-bold flex items-center gap-1 text-amber-300 mb-0.5">
                <Sparkles size={12} /> 大白话比喻：
              </span>
              <span className="leading-normal">
                {analogy.startsWith('如果你不理解') ? analogy : `如果你不理解，你就理解为：${analogy}`}
              </span>
            </div>
          )}

          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent"
            style={{ borderTopColor: '#0f172a' }}
          />
        </span>
      )}
    </span>
  );
};
