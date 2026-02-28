import type { ModCategory, ModItem } from "../types";

export const categoryLabels: Record<ModCategory, string> = {
  all: "すべて",
  feature: "機能追加",
  world: "バイオーム/地形",
  performance: "軽量化",
  ui: "UI・機能改善",
  library: "前提API/ライブラリ",
  other: "探索・QoL・運用",
};

const WORLD_SLUGS = new Set([
  "dungeon-crawl",
  "dungeonsenhanced",
  "dungeon-and-taverns",
  "william-wythers-overhauled-overworld",
  "expanded-ecosphere",
  "incendium",
  "tidal-towns",
  "choicetheorems-overhauled-village",
  "yungs-better-nether-fortresses",
  "yungs-better-end-island",
  "farmers-structures",
]);

const PERFORMANCE_SLUGS = new Set([
  "dynamic-fps",
  "embeddium",
  "immediatelyfast",
  "ferritecore",
  "modernfix",
  "entityculling",
  "alltheleaks",
  "clumps",
  "particle-core",
  "fastsuite",
]);

const OPERATIONS_SLUGS = new Set([
  "hook",
  "explorers-compass",
  "natures-compass",
  "magnum-torch",
  "melody",
  "fancymenu",
  "not-enough-animations",
  "playeranimator",
  "camera-mod",
  "loot-journal",
  "loot-integrations",
  "loot-integrations-dungeons-and-taverns",
  "loot-integrations-dungeon-crawl",
  "loot-integrations-choicetheorems-overhauled",
  "dungeons-enhanced-lootintegration-addon",
  "fast-leaf-decay",
  "faster-ladder-climbing",
  "kleeslabs",
  "netherportalfix",
  "hourglass",
  "scaffolding-drops-nearby",
  "vein-mining",
  "villagers-drop-emeralds-on-death",
  "gravestone-mod",
  "attributefix",
  "oculus",
  "fzzy-config",
  "extrasounds-forge",
]);

const UI_SLUGS = new Set([
  "chat-heads",
  "cut-through",
  "clickthrough-plus",
  "jei",
  "emi",
  "emi-ores",
  "emienchants",
  "emi-trades-villager-trading-emi-plugin",
  "emi-professions-emip",
  "emiffect-status-effects-emi-plugin",
  "appleskin",
  "mouse-tweaks",
  "invmove",
  "controlling",
  "better-advancements",
  "advancement-plaques",
  "legendary-tooltips",
  "great-scrollable-tooltips",
  "toast-control",
  "drippy-loading-screen",
  "durability-tooltip",
  "polymorph",
  "betterf3",
  "fancymenu",
  "not-enough-animations",
]);

const FEATURE_SLUGS = new Set([
  "toms-storage",
  "create",
  "create-stuff-additions",
  "slice-and-dice",
  "create-central-kitchen",
  "create-confectionery",
  "lightmans-currency",
  "waystones",
  "travelers-backpack",
  "inventory-sorter",
  "chunk-loaders",
  "farmers-delight",
  "aquaculture",
  "aquaculture-delight",
  "rightclickharvest",
  "xp-from-harvest-reworked",
  "spartan-weaponry",
  "spartan-shields",
  "passive-skill-tree",
  "passive-skill-tree-additions",
  "bosses-of-mass-destruction-forge",
  "enchanting-infuser",
  "easy-magic",
  "true-ending",
  "simple-voice-chat",
  "simple-discord-link-bot-forge-fabric-spigot",
  "vein-mining",
  "gravestone-mod",
  "camera-mod",
  "hook",
  "explorers-compass",
  "natures-compass",
  "loot-journal",
]);

const LIBRARY_SLUG_KEYWORDS = [
  "api",
  "lib",
  "config",
  "core",
  "kotlin-for-forge",
  "playeranimator",
  "geckolib",
  "collective",
  "cupboard",
  "searchables",
  "structure-",
];

const EXCLUDED_SLUGS = new Set([
  "placebo",
  "fzzy-config",
  "balm",
  "iceberg",
  "konkrete",
  "playeranimator",
  "curios",
  "fancymenu",
  "oculus",
  "dungeons-enhanced-lootintegration-addon",
]);

const SORT_WEIGHTS: Record<string, number> = {
  // UI / Recipe
  jei: 10,
  emi: 11,
  "emi-ores": 12,
  emienchants: 13,
  "emi-trades-villager-trading-emi-plugin": 14,
  "emi-professions-emip": 15,
  "emiffect-status-effects-emi-plugin": 16,
  appleskin: 17,
  "legendary-tooltips": 18,
  "great-scrollable-tooltips": 19,
  "durability-tooltip": 20,

  // Feature (Create & Addons)
  create: 100,
  "create-stuff-additions": 101,
  "slice-and-dice": 102,
  "create-central-kitchen": 103,
  "create-confectionery": 104,

  // Storage / Backpacks
  "toms-storage": 110,
  "inventory-sorter": 111,
  "travelers-backpack": 112,

  // Combat / Defense
  "spartan-weaponry": 120,
  "spartan-shields": 121,

  // Magic
  "easy-magic": 130,
  "enchanting-infuser": 131,

  // Agriculture
  "farmers-delight": 140,
  rightclickharvest: 141,
  "xp-from-harvest-reworked": 142,

  // Bosses
  "bosses-of-mass-destruction-forge": 150,
  "true-ending": 151,

  // World Building / Structures
  "dungeon-crawl": 200,
  dungeonsenhanced: 201,
  "dungeon-and-taverns": 202,
  "choicetheorems-overhauled-village": 203,
  "tidal-towns": 204,
  "william-wythers-overhauled-overworld": 205,
  "farmers-structures": 206,

  // Navigation
  "natures-compass": 300,
  "explorers-compass": 301,
  waystones: 302,

  // Others
  invmove: 400,
  "mouse-tweaks": 401,
  controlling: 402,
  hook: 403,
};

function getSortWeight(slug: string): number {
  return SORT_WEIGHTS[slug] ?? 999;
}

export function classifyMod(slug: string): Exclude<ModCategory, "all"> {
  if (WORLD_SLUGS.has(slug)) return "world";
  if (PERFORMANCE_SLUGS.has(slug)) return "performance";
  if (OPERATIONS_SLUGS.has(slug)) return "other";
  if (UI_SLUGS.has(slug)) return "ui";
  if (FEATURE_SLUGS.has(slug)) return "feature";
  if (LIBRARY_SLUG_KEYWORDS.some((keyword) => slug.includes(keyword)))
    return "library";
  return "other";
}

export function defaultOverview(
  name: string,
  category: Exclude<ModCategory, "all">,
): string {
  switch (category) {
    case "feature":
      return `${name} はゲームプレイ要素を拡張する機能追加系Modです。`;
    case "world":
      return `${name} は地形・構造物・探索体験に関わるワールド拡張系Modです。`;
    case "performance":
      return `${name} は描画やメモリなどの負荷軽減を狙う最適化系Modです。`;
    case "ui":
      return `${name} はUI表示や操作性を改善するQoL系Modです。`;
    case "library":
      return `${name} は他Modの動作に必要な前提ライブラリ/共通基盤です。`;
    default:
      return `${name} は探索体験や運用面、日常的なQoLを補強する補助系Modです。`;
  }
}

export function normalizeModName(name: string): string {
  // Removes " (by Author)", " (Fabric/Forge/Quilt)", " [Forge | NeoForge]", " (Fork)", etc.
  // from the end of the mod name string to allow fuzzy matching.
  return name
    .replace(/\s+\(by [^)]+\)\s*$/, "")
    .replace(/\s*(?:\[[^\]]*\]|\([^)]*\))\s*$/, "")
    .trim();
}

export function shouldHideModCardByOverview(overview: string): boolean {
  return (
    overview.includes("向け戦利品連携を提供。") ||
    overview.includes("サーバー体験を補強する補助系Modです。") ||
    overview.includes("基盤ライブラリ")
  );
}

export function parseOverviewMap(markdown: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("- ")) continue;
    const content = line.slice(2).trim();
    const splitIndex = content.lastIndexOf(":");
    if (splitIndex === -1) continue;
    const name = normalizeModName(content.slice(0, splitIndex).trim());
    const overview = content.slice(splitIndex + 1).trim();
    if (name && overview) {
      map.set(name, overview);
    }
  }
  return map;
}

export function parseMods(
  html: string,
  overviewMap: Map<string, string>,
): ModItem[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const anchors = Array.from(doc.querySelectorAll<HTMLAnchorElement>("li > a"));
  return anchors
    .map((anchor) => {
      const rawName = anchor.textContent?.trim() ?? "Unknown Mod";
      const name = normalizeModName(rawName);
      const url = anchor.href;
      const slug = url.split("/").pop() ?? url;
      if (EXCLUDED_SLUGS.has(slug) || slug.startsWith("loot-integrations")) {
        return null;
      }
      const category = classifyMod(slug);
      const overviewBase =
        overviewMap.get(name) ?? defaultOverview(name, category);
      if (shouldHideModCardByOverview(overviewBase)) {
        return null;
      }
      const overview = overviewBase;
      return { name, url, slug, category, overview };
    })
    .filter((mod): mod is ModItem => mod !== null)
    .sort((a, b) => {
      const weightA = getSortWeight(a.slug);
      const weightB = getSortWeight(b.slug);
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      return a.name.localeCompare(b.name, "ja");
    });
}
