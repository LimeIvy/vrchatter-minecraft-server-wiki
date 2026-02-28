import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODLIST_PATH = path.join(__dirname, "public", "modlist.html");
const ICONS_DIR = path.join(__dirname, "public", "mod-icons");

// Create the icons directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Slugs that shouldn't be parsed or don't have good icons on CurseForge
const EXCLUDED_SLUGS = new Set([
  "placebo",
  "fzzy-config",
  "balm",
  "iceberg",
  "konkrete",
  "loot-integrations",
  "curios",
]);

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`  [!] Failed to download image from ${url}:`, err.message);
    return false;
  }
}

async function getImageUrlFromCfWidget(slug) {
  try {
    const res = await fetch(
      `https://api.cfwidget.com/minecraft/mc-mods/${slug}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail || null;
  } catch (err) {
    return null;
  }
}

async function run() {
  console.log("🤖 Parsing modlist.html to find CurseForge URLs...");

  if (!fs.existsSync(MODLIST_PATH)) {
    console.error(`Error: Could not find ${MODLIST_PATH}`);
    process.exit(1);
  }

  const html = fs.readFileSync(MODLIST_PATH, "utf-8");

  // Very simplistic HTML parsing to extract URLs
  // This expects format like: <li><a href="https://www.curseforge.com/minecraft/mc-mods/slug">Mod Name</a></li>
  const urlRegex =
    /href="https:\/\/www\.curseforge\.com\/minecraft\/mc-mods\/([^"]+)"/g;

  const slugs = new Set();
  let match;
  while ((match = urlRegex.exec(html)) !== null) {
    const slug = match[1].split("/").pop(); // Just in case there are nested paths
    if (!EXCLUDED_SLUGS.has(slug)) {
      slugs.add(slug);
    }
  }

  const total = slugs.size;
  console.log(`📦 Found ${total} unique valid target mods.`);

  let count = 0;
  for (const slug of slugs) {
    count++;
    const destPath = path.join(ICONS_DIR, `${slug}.png`);

    // Skip if we already downloaded it (useful for re-runs)
    if (fs.existsSync(destPath)) {
      console.log(
        `[${count}/${total}] ⏩ Skipping ${slug}.png (Already exists)`,
      );
      continue;
    }

    console.log(`[${count}/${total}] 🔍 Fetching metadata for ${slug}...`);
    const imageUrl = await getImageUrlFromCfWidget(slug);

    if (imageUrl) {
      console.log(`      ⬇️ Downloading image...`);
      const success = await downloadImage(imageUrl, destPath);
      if (success) {
        console.log(`      ✅ Saved ${slug}.png`);
      }
    } else {
      console.log(`      ⚠️ Could not find thumbnail URL for ${slug}`);
    }

    // Politeness delay to avoid hitting CFWidget rate limit (if they have one)
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n🎉 Finished downloading mod icons!");
}

run();
