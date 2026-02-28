export type TopTab = "setup" | "mods";
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
