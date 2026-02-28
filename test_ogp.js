const testUrl = "https://www.curseforge.com/minecraft/mc-mods/appleskin";

async function run() {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(testUrl)}`;
  console.log(`Fetching: ${proxyUrl}`);
  try {
    const res = await fetch(proxyUrl);
    const data = await res.json();
    const text = data.contents;
    const match = text.match(/<meta property="og:image" content="([^"]+)"/);
    if (match && match[1]) {
      console.log("Found OGP image:", match[1]);
    } else {
      console.log("No OGP image found");
      console.log("Sample of HTML:", text.substring(0, 500));
    }
  } catch (err) {
    console.error("Error fetching via allorigins:", err);
  }
}

run();
