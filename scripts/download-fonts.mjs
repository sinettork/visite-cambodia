import fs from "node:fs";
import path from "node:path";

const fontsDir = path.join(process.cwd(), "public", "fonts");
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchCss(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  return await res.text();
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function main() {
  console.log("Fetching font CSS definitions from Google Fonts...");

  const fontConfigs = [
    {
      name: "battambang",
      url: "https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap",
    },
    {
      name: "noto-sans-khmer",
      url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;500;700&display=swap",
    },
    {
      name: "roboto",
      url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
    {
      name: "roboto-condensed",
      url: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&display=swap",
    },
  ];

  let combinedCss = "";

  for (const config of fontConfigs) {
    const css = await fetchCss(config.url);
    const blocks = css.split("@font-face").slice(1);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const unicodeMatch = block.match(/unicode-range:\s*([^;]+);/);
      const unicodeRange = unicodeMatch ? unicodeMatch[1].trim() : "";

      let subset = "";
      if (unicodeRange.includes("U+1780-17FF")) {
        subset = "khmer";
      } else if (unicodeRange.includes("U+0000-00FF")) {
        subset = "latin";
      } else {
        continue;
      }

      const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)/);
      const weightMatch = block.match(/font-weight:\s*([^;]+)/);
      const styleMatch = block.match(/font-style:\s*([^;]+)/);
      const urlMatch = block.match(/url\((https:[^)]+)\)/);

      if (!familyMatch || !weightMatch || !urlMatch) continue;

      const family = familyMatch[1].trim();
      const weight = weightMatch[1].trim();
      const style = styleMatch ? styleMatch[1].trim() : "normal";
      const remoteUrl = urlMatch[1];

      const safeFamily = family.toLowerCase().replace(/\s+/g, "-");
      const filename = `${safeFamily}-${weight}-${subset}.woff2`;
      const dest = path.join(fontsDir, filename);

      console.log(`Downloading ${filename} from ${remoteUrl}...`);
      await downloadFile(remoteUrl, dest);

      combinedCss += `@font-face {\n`;
      combinedCss += `  font-family: '${family}';\n`;
      combinedCss += `  font-style: ${style};\n`;
      combinedCss += `  font-weight: ${weight};\n`;
      combinedCss += `  font-display: swap;\n`;
      combinedCss += `  src: url('/fonts/${filename}') format('woff2');\n`;
      if (unicodeRange) {
        combinedCss += `  unicode-range: ${unicodeRange};\n`;
      }
      combinedCss += `}\n\n`;
    }
  }

  const cssDest = path.join(fontsDir, "fonts.css");
  fs.writeFileSync(cssDest, combinedCss, "utf8");
  console.log(`Saved CSS to ${cssDest}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
