import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(__dirname, "../public");
const logo = path.join(pub, "aura-logo.png");

const cream = "#fff8ee";
const ink = "#1c1408";

await sharp(logo)
  .resize(32, 32, { fit: "contain", background: cream })
  .png()
  .toFile(path.join(pub, "favicon-32.png"));

await sharp(path.join(pub, "favicon-32.png"))
  .resize(32, 32)
  .toFile(path.join(pub, "favicon.ico"));

const ogWidth = 1200;
const ogHeight = 630;
const logoWidth = 420;

const logoBuffer = await sharp(logo)
  .resize(logoWidth, null, { fit: "inside" })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoBuffer).metadata();
const logoLeft = Math.round((ogWidth - (logoMeta.width ?? logoWidth)) / 2);
const logoTop = Math.round((ogHeight - (logoMeta.height ?? 200)) / 2) - 40;

const titleSvg = Buffer.from(`
  <svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${cream}"/>
    <text x="50%" y="78%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="${ink}">Pure Hands, Pure Care</text>
    <text x="50%" y="86%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${ink}" opacity="0.72">Hand wash &amp; home care essentials</text>
  </svg>
`);

await sharp(titleSvg)
  .composite([{ input: logoBuffer, left: logoLeft, top: Math.max(logoTop, 48) }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(pub, "og-image.jpg"));

console.log("Generated favicon.ico, favicon-32.png, og-image.jpg");
