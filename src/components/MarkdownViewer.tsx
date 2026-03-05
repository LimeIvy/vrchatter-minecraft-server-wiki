import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  url: string;
}

export function MarkdownViewer({ url }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('記事の読み込みに失敗しました。');
        }
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setContent(text);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (loading) {
    return <div className="p-4 text-center text-[#aaaaaa]">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="markdown-body p-4 md:p-8 bg-[#202020] border-2 border-[#111111] shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.5)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 pb-2 border-b-2 border-[#555] text-white" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-white" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-[#cccccc]" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-[#cccccc]" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-[#cccccc]" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => <a className="text-[#55aaff] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[#555] pl-4 italic text-[#aaaaaa] mb-4" {...props} />,
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className="bg-[#111111] text-[#ffaa00] px-1 py-0.5 rounded text-sm" {...props} />
            ) : (
              <pre className="bg-[#111111] p-4 rounded mb-4 overflow-x-auto border-2 border-[#333333]">
                <code className="text-[#aaaaaa] text-sm" {...props} />
              </pre>
            ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-[#555]" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className="border border-[#555] bg-[#333] px-4 py-2 text-white font-bold" {...props} />,
          td: ({ node, ...props }) => <td className="border border-[#555] px-4 py-2 text-[#ccc]" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-[#ffdd55]" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
