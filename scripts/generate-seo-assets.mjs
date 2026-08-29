import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(__dirname, "../public");
const source = path.resolve(
  __dirname,
  "../assets/aura-clean-logo-source.png",
);

if (!fs.existsSync(source)) {
  console.error("Missing source logo at", source);
  process.exit(1);
}

fs.copyFileSync(source, path.join(pub, "aura-clean-logo.png"));

const meta = await sharp(source).metadata();
const width = meta.width ?? 1200;
const height = meta.height ?? 600;

/** Left icon mark — readable at 16–32px in the browser tab. */
const iconSize = Math.round(height * 0.98);
const iconLeft = Math.max(0, Math.round(width * 0.02));
const iconTop = Math.max(0, Math.round((height - iconSize) / 2));

const iconBuffer = await sharp(source)
  .extract({
    left: iconLeft,
    top: iconTop,
    width: Math.min(iconSize, width - iconLeft),
    height: Math.min(iconSize, height - iconTop),
  })
  .png()
  .toBuffer();

const cream = "#ffffff";

async function writeIcon(size, filename, padding = 0.12) {
  const inner = Math.round(size * (1 - padding * 2));
  const pad = Math.round(size * padding);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: cream,
    },
  })
    .composite([
      {
        input: await sharp(iconBuffer)
          .resize(inner, inner, { fit: "contain", background: cream })
          .png()
          .toBuffer(),
        left: pad,
        top: pad,
      },
    ])
    .png()
    .toFile(path.join(pub, filename));
}

await writeIcon(32, "favicon-32.png");
await writeIcon(16, "favicon-16.png");
await writeIcon(180, "apple-touch-icon.png");

await sharp(path.join(pub, "favicon-32.png"))
  .resize(32, 32)
  .toFile(path.join(pub, "favicon.ico"));

/** OG image uses the full horizontal logo. */
const ogWidth = 1200;
const ogHeight = 630;
const logoWidth = 560;

const logoBuffer = await sharp(source)
  .resize(logoWidth, null, { fit: "inside", background: cream })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoBuffer).metadata();
const logoLeft = Math.round((ogWidth - (logoMeta.width ?? logoWidth)) / 2);
const logoTop = Math.round((ogHeight - (logoMeta.height ?? 200)) / 2) - 20;

const titleSvg = Buffer.from(`
  <svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${cream}"/>
    <text x="50%" y="82%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#002D62">Pure Hands, Pure Care</text>
    <text x="50%" y="90%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#4CAF50">Hand wash &amp; home care essentials</text>
  </svg>
`);

await sharp(titleSvg)
  .composite([{ input: logoBuffer, left: logoLeft, top: Math.max(logoTop, 40) }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(pub, "og-image.jpg"));

console.log("Generated favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png, og-image.jpg");
