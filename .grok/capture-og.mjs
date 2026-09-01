import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const jobs = [
  {
    html: "/workspace/.grok/og-card.html",
    out: "/workspace/.grok/og-card-raw.png",
    width: 1200,
    height: 630,
  },
  {
    html: "/workspace/.grok/x-banner.html",
    out: "/workspace/.grok/x-banner-raw.png",
    width: 1200,
    height: 264,
  },
];

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  for (const job of jobs) {
    const page = await browser.newPage({
      viewport: { width: job.width, height: job.height },
      deviceScaleFactor: 2,
    });
    await page.goto(pathToFileURL(job.html).href, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({
      path: job.out,
      type: "png",
      clip: { x: 0, y: 0, width: job.width, height: job.height },
    });
    await page.close();
    console.log(JSON.stringify({ ok: true, out: job.out, size: `${job.width}x${job.height}` }));
  }
  writeFileSync("/workspace/.grok/og-pending", "");
} catch (err) {
  console.error(String(err?.message || err));
  process.exitCode = 1;
} finally {
  await browser.close();
}
