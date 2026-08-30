import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Terminal, Code2 } from 'lucide-react';

interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
  badge?: string;
  badgeType?: 'danger' | 'success' | 'info';
}

interface CodeBlockProps {
  snippets: CodeSnippet[];
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippets, title }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeStyle = (type?: 'danger' | 'success' | 'info') => {
    switch (type) {
      case 'danger':
        return { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' };
      case 'success':
        return { bg: '#dcfce7', text: '#166534', border: '#86efac' };
      case 'info':
      default:
        return { bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' };
    }
  };

  return (
    <div
      style={{
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fafbfc',
        overflow: 'hidden',
        margin: '20px 0',
        boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
      }}
    >
      {/* 顶部工具条 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '13px',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {/* 多标签或文件名 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {snippets.length > 1 ? (
            snippets.map((snip, idx) => (
              <button
                key={snip.filename}
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: activeTab === idx ? '#4f46e5' : '#ffffff',
                  borderColor: activeTab === idx ? '#4f46e5' : '#e2e8f0',
                  color: activeTab === idx ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease',
                }}
              >
                <Code2 size={13} />
                <span>{snip.filename}</span>
              </button>
            ))
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#334155', fontWeight: 600 }}>
              <Terminal size={14} color="#4f46e5" />
              <span>{currentSnippet.filename}</span>
            </div>
          )}

          {currentSnippet.badge && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: getBadgeStyle(currentSnippet.badgeType).bg,
                color: getBadgeStyle(currentSnippet.badgeType).text,
                border: `1px solid ${getBadgeStyle(currentSnippet.badgeType).border}`,
              }}
            >
              {currentSnippet.badge}
            </span>
          )}
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            color: copied ? '#059669' : '#475569',
            transition: 'all 0.2s',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          {copied ? (
            <>
              <Check size={13} color="#059669" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>复制代码</span>
            </>
          )}
        </button>
      </div>

      {/* 代码高亮区域 */}
      <div style={{ margin: 0, overflowX: 'auto', backgroundColor: '#fafbfc' }}>
        <SyntaxHighlighter
          language={currentSnippet.language}
          style={oneLight}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            padding: '18px 20px',
            fontSize: '13.5px',
            lineHeight: '1.65',
            backgroundColor: '#fafbfc',
            fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#cbd5e1',
            textAlign: 'right',
            userSelect: 'none',
          }}
        >
          {currentSnippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
