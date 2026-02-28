import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODLIST_PATH = path.join(__dirname, "public", "modlist.html");
const ICONS_DIR = path.join(__dirname, "public", "mod-icons");

const html = fs.readFileSync(MODLIST_PATH, "utf-8");
const urlRegex =
  /href="https:\/\/www\.curseforge\.com\/minecraft\/mc-mods\/([^"]+)"/g;

const expectedSlugs = new Set();
let match;
while ((match = urlRegex.exec(html)) !== null) {
  const slug = match[1].split("/").pop();
  expectedSlugs.add(slug);
}

const missing = [];
for (const slug of expectedSlugs) {
  if (!fs.existsSync(path.join(ICONS_DIR, `${slug}.png`))) {
    missing.push(slug);
  }
}

console.log(missing.join("\n"));
