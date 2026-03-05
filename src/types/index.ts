export type TopTab = "setup" | "mods" | "news" | "tips";

export type ArticleMeta = {
  id: string; // ID is the filename without .md (e.g. 20260305-industrial-start)
  title: string; // The display title of the article
  date: string; // Date string like "2026-03-05"
  category?: string; // For categorizing tips (e.g., "industrial", "combat")
  description?: string; // Short description
};

export type ModCategory =
  | "all"
  | "feature"
  | "world"
  | "performance"
  | "ui"
  | "library"
  | "other";
export type ModTab = Exclude<ModCategory, "library">;

export type ModItem = {
  name: string;
  url: string;
  slug: string;
  category: Exclude<ModCategory, "all">;
  overview: string;
};
