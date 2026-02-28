import { useEffect, useMemo, useState } from 'react'
import type { TopTab, ModTab, ModItem } from './types'
import { parseOverviewMap, parseMods } from './utils/modUtils'
import { HeroSection } from './components/HeroSection'
import { SetupTab } from './components/SetupTab'
import { ModsTab } from './components/ModsTab'
import { playClickSound } from './utils/soundUtils'

export default function App() {
  const getInitialTopTab = (): TopTab => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'mods' ? 'mods' : 'setup';
  };

  const getInitialModTab = (): ModTab => {
    const saved = localStorage.getItem('selectedModTab');
    const validTabs: ModTab[] = ['feature', 'world', 'ui', 'other'];
    if (saved && validTabs.includes(saved as ModTab)) {
      return saved as ModTab;
    }
    return 'feature';
  };

  const [topTab, setTopTab] = useState<TopTab>(getInitialTopTab());
  const [modTab, setModTab] = useState<ModTab>(getInitialModTab());
  const [mods, setMods] = useState<ModItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'mods' || hash === 'setup') {
        setTopTab(hash as TopTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTopTabChange = (tab: TopTab) => {
    setTopTab(tab);
    window.location.hash = tab;
  };

  const handleModTabChange = (tab: ModTab) => {
    setModTab(tab);
    localStorage.setItem('selectedModTab', tab);
  };

  useEffect(() => {
    const loadMods = async () => {
      try {
        const [modListResponse, summaryResponse] = await Promise.all([
          fetch('modlist.html'),
          fetch('mod-summary.md'),
        ])

        if (!modListResponse.ok) {
          throw new Error(`modlist.html の読み込みに失敗しました: ${modListResponse.status}`)
        }
        if (!summaryResponse.ok) {
          throw new Error(`mod-summary.md の読み込みに失敗しました: ${summaryResponse.status}`)
        }

        const [html, summaryMarkdown] = await Promise.all([modListResponse.text(), summaryResponse.text()])
        const overviewMap = parseOverviewMap(summaryMarkdown)
        const parsed = parseMods(html, overviewMap)
        setMods(parsed)
      } catch (err) {
        console.error(err)
        setError('Mod一覧の読み込みに失敗しました。modlist.html と mod-summary.md を確認してください。')
      } finally {
        setLoading(false)
      }
    }
    void loadMods()
  }, [])

  const currentModTabs: ModTab[] = ['feature', 'world', 'ui', 'other']

  const visibleMods = useMemo(() => mods.filter((mod) => mod.category !== 'library'), [mods])

  const filteredMods = useMemo(
    () => visibleMods.filter((mod) => mod.category === modTab),
    [visibleMods, modTab],
  )

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 text-[1.1rem]">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Container Container */}
      <div className="mc-panel p-2 md:p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)]">
        {/* Top Tabs */}
        <div className="flex gap-2 border-b-4 border-[#555555] pb-4 mb-6">
          <button
            className={`mc-button flex-1 py-3 text-xl ${topTab === 'setup' ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              handleTopTabChange('setup');
            }}
          >
            導入方法 (Setup)
          </button>
          <button
            className={`mc-button flex-1 py-3 text-xl ${topTab === 'mods' ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              handleTopTabChange('mods');
            }}
          >
            Mod紹介 (Mods)
          </button>
        </div>

        {/* Content Area */}
        {topTab === 'setup' ? (
          <SetupTab />
        ) : (
          <ModsTab
            modTab={modTab}
            setModTab={handleModTabChange}
            currentModTabs={currentModTabs}
            filteredMods={filteredMods}
            loading={loading}
            error={error}
          />
        )}
      </div>
      {/* Back to Top */}
      <div className="flex justify-center mt-2 mb-8">
        <button
          className="mc-button py-3 px-8 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
          onClick={() => {
            playClickSound();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          ▲ トップへ戻る
        </button>
      </div>
    </div>
  )
}
