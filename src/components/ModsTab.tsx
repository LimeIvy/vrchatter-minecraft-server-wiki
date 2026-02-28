import { memo } from 'react';
import type { ModItem, ModTab } from '../types'
import { categoryLabels } from '../utils/modUtils'
import { ModIcon } from './ModIcon'
import { playClickSound } from '../utils/soundUtils'

interface ModsTabProps {
  modTab: ModTab
  setModTab: (tab: ModTab) => void
  currentModTabs: ModTab[]
  filteredMods: ModItem[]
  loading: boolean
  error: string | null
}

export const ModsTab = memo(function ModsTab({
  modTab,
  setModTab,
  currentModTabs,
  filteredMods,
  loading,
  error,
}: ModsTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-[#8b8b8b] pb-2">
        <h2 className="text-2xl font-bold">📦 導入Mod紹介</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentModTabs.map((category) => (
          <button
            key={category}
            className={`mc-button px-4 py-2 text-[1rem] ${modTab === category ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setModTab(category);
            }}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-10 mc-text-shadow text-xl animate-pulse">
          読込中... (Loading terrain...)
        </div>
      )}
      {error && (
        <div className="text-[#FF5555] font-bold mc-text-shadow text-center py-10 bg-[#3d424b] border-2 border-black shadow-[inset_2px_2px_0px_0px_#6b7381]">
          エラー発生: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMods.map((mod) => (
            <div key={mod.url} className="bg-[#8b8b8b] border-2 border-black shadow-[inset_2px_2px_0px_0px_#c6c6c6,inset_-2px_-2px_0px_0px_#555555] p-3 flex flex-col h-full hover:bg-[#9b9b9b] transition-colors group">
              <div className="flex items-start gap-4 border-b-2 border-black pb-3 mb-3">
                <div className="w-24 h-24 shrink-0 bg-[#c6c6c6] border-2 border-black shadow-[inset_2px_2px_0px_0px_#555555,inset_-2px_-2px_0px_0px_#ffffff] flex items-center justify-center p-1 overflow-hidden">
                  <ModIcon slug={mod.slug} name={mod.name} />
                </div>
                <a href={mod.url} target="_blank" rel="noreferrer" className="flex-1 transition-colors group cursor-pointer" onClick={playClickSound}>
                  <h3 className="font-bold text-white mc-text-shadow text-2xl inline-block group-hover:border-b-2 border-white" title={mod.name}>{mod.name}</h3>
                </a>
              </div>

              <div className="bg-[#c6c6c6] border-2 border-black shadow-[inset_2px_2px_0px_0px_#555555,inset_-2px_-2px_0px_0px_#ffffff] text-[#3F3F3F] p-3 mt-1 flex-grow text-sm leading-relaxed overflow-y-auto font-bold">
                {mod.overview || "説明がありません。"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
});
