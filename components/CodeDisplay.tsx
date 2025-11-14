
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CodeDisplayProps {
  code: string;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const hasContent = isLoading || code;

  if (!hasContent) {
    return null;
  }
  
  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-lg shadow-lg relative min-h-[200px] flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-400">Generated Code</span>
        <button
          onClick={handleCopy}
          disabled={!code || isLoading}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isCopied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-4 flex-grow overflow-auto">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <pre className="text-sm" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            <code className="language-javascript whitespace-pre-wrap break-words">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
