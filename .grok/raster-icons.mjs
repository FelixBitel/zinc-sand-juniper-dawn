import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const svg = readFileSync("/workspace/.grok/favicon.svg", "utf8");

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function raster(size, out) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html><head><style>
      *{margin:0;padding:0;background:transparent}
      html,body{width:${size}px;height:${size}px;overflow:hidden}
      svg{width:${size}px;height:${size}px;display:block}
    </style></head><body>${svg}</body></html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({ path: out, omitBackground: false });
  await page.close();
}

try {
  await raster(16, "/workspace/.grok/favicon-16.png");
  await raster(32, "/workspace/.grok/favicon-32.png");
  await raster(192, "/workspace/.grok/icon-192.png");
  await raster(512, "/workspace/.grok/icon-512.png");
  writeFileSync("/workspace/.grok/og-pending", "");
  console.log("ok");
} finally {
  await browser.close();
}
