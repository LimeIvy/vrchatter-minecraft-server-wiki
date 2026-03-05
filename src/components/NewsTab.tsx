import { useState, useEffect } from 'react';
import type { ArticleMeta } from '../types';
import { MarkdownViewer } from './MarkdownViewer';
import { playClickSound } from '../utils/soundUtils';

export function NewsTab() {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('news/index.json')
      .then(res => {
        if (!res.ok) throw new Error('ニュース一覧の取得に失敗しました');
        return res.json();
      })
      .then(data => {
        setArticles(data.sort((a: ArticleMeta, b: ArticleMeta) => b.date.localeCompare(a.date)));
      })
      .catch(err => {
        console.error(err);
        setError('ニュースを読み込めませんでした。後でもう一度お試しください。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8">読み込み中...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  if (selectedArticleId) {
    return (
      <div className="flex flex-col gap-4">
        <button
          className="mc-button py-2 px-4 self-start flex items-center gap-2"
          onClick={() => {
            playClickSound();
            setSelectedArticleId(null);
          }}
        >
          <span>◀</span> ニュース一覧に戻る
        </button>
        <MarkdownViewer url={`news/${selectedArticleId}.md`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">サーバーニュース</h2>
      {articles.length === 0 ? (
        <div className="p-8 text-center text-[#aaaaaa]">ニュースはまだありません。</div>
      ) : (
        <div className="flex flex-col gap-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer bg-[#202020] border-2 border-[#111111] p-4 hover:border-white transition-colors relative"
              onClick={() => {
                playClickSound();
                setSelectedArticleId(article.id);
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#ffffff22] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#ffdd55] transition-colors">{article.title}</h3>
                <span className="text-[#aaaaaa] text-sm shrink-0">{article.date}</span>
              </div>
              {article.description && (
                <p className="text-[#cccccc] text-sm mt-1">{article.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
