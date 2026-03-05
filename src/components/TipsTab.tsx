import { useState, useEffect, useMemo } from 'react';
import type { ArticleMeta } from '../types';
import { MarkdownViewer } from './MarkdownViewer';
import { playClickSound } from '../utils/soundUtils';

export function TipsTab() {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('tips/index.json')
      .then(res => {
        if (!res.ok) throw new Error('Tips一覧の取得に失敗しました');
        return res.json();
      })
      .then(data => {
        setArticles(data.sort((a: ArticleMeta, b: ArticleMeta) => b.date.localeCompare(a.date)));
      })
      .catch(err => {
        console.error(err);
        setError('Tipsを読み込めませんでした。後でもう一度お試しください。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach(a => {
      if (a.category) cats.add(a.category);
    });
    return ['all', ...Array.from(cats)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Translate category keys to display names
  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'all': 'すべて',
      'industry': '工業・自動化',
      'combat': '戦闘・装備',
      'explore': '探索',
      'finance': '金融',
      'other': 'その他'
    };
    return labels[cat] || cat;
  };

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
          <span>◀</span> Tips一覧に戻る
        </button>
        <MarkdownViewer url={`tips/${selectedArticleId}.md`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold">Tips・小技</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="記事を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-[#202020] border-2 border-[#111111] text-white focus:outline-none focus:border-[#55aaff] w-full md:w-64"
        />
      </div>

      {/* Category Filters */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1 font-bold ${selectedCategory === cat
                ? 'bg-[#55aaff] text-[#111111] border-2 border-[#ffffff]'
                : 'bg-[#333333] text-white border-2 border-[#111111] hover:bg-[#444444]'
                }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      )}

      {/* Article List */}
      {filteredArticles.length === 0 ? (
        <div className="p-8 text-center text-[#aaaaaa]">該当する記事が見つかりません。</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer bg-[#202020] border-2 border-[#111111] p-4 hover:border-white transition-colors relative flex flex-col h-full"
              onClick={() => {
                playClickSound();
                setSelectedArticleId(article.id);
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#ffffff22] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#ffdd55] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.category && (
                  <span className="text-xs font-bold bg-[#333333] text-[#aaaaaa] px-2 py-1 whitespace-nowrap">
                    {getCategoryLabel(article.category)}
                  </span>
                )}
              </div>

              {article.description && (
                <p className="text-[#cccccc] text-sm mt-1 mb-4 flex-grow line-clamp-3">
                  {article.description}
                </p>
              )}

              <div className="text-right mt-auto">
                <span className="text-[#aaaaaa] text-xs">{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
