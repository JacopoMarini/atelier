#!/usr/bin/env node
// Atelier — shoot.mjs
// Render a URL or local HTML file and save full-page screenshots at several widths,
// plus a reduced-motion capture, optional scroll frames and an optional axe-core report.
//
// Requires Playwright (`npm i -D playwright && npx playwright install chromium`, or a global install).
//
// Usage:
//   node shoot.mjs <url-or-html-file> [--out .atelier/shots] [--widths 390,768,1440]
//                  [--scroll N] [--axe] [--dark] [--wait 800]

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// Resolve packages from the user's project first, then from this script's folder.
const projectRequire = createRequire(join(process.cwd(), "package.json"));
function req(id) {
  try { return projectRequire(id); } catch {}
  return require(id);
}
function resolveFromProject(id) {
  try { return projectRequire.resolve(id); } catch {}
  return require.resolve(id);
}

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) return fallback;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

const target = process.argv[2];
if (!target || target.startsWith("--")) {
  console.error("Usage: node shoot.mjs <url-or-html-file> [--out dir] [--widths 390,768,1440] [--scroll N] [--axe] [--dark] [--wait ms]");
  process.exit(2);
}

const url = /^https?:\/\//.test(target) ? target : pathToFileURL(resolve(target)).href;
const out = resolve(arg("out", ".atelier/shots"));
const widths = String(arg("widths", "390,768,1440")).split(",").map(Number).filter(Boolean);
const scrollFrames = Number(arg("scroll", 0)) || 0;
const wantAxe = arg("axe", false) === true;
const dark = arg("dark", false) === true;
const wait = Number(arg("wait", 800));

function loadPlaywright() {
  const tries = ["playwright", "playwright-core", "/opt/npm-tools/node_modules/playwright"];
  for (const t of tries) {
    try { return req(t); } catch {}
  }
  // global npm root
  try {
    const { execSync } = require("node:child_process");
    const root = execSync("npm root -g", { encoding: "utf8" }).trim();
    return require(join(root, "playwright"));
  } catch {}
  return null;
}

const pw = loadPlaywright();
if (!pw) {
  console.error("Playwright not found. Install it with: npm i -D playwright && npx playwright install chromium");
  process.exit(3);
}

mkdirSync(out, { recursive: true });
const browser = await pw.chromium.launch();
const saved = [];

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page.waitForTimeout(wait);
}

for (const w of widths) {
  const h = w < 600 ? 844 : w < 1100 ? 1024 : 900;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 600 ? 2 : 1, colorScheme: dark ? "dark" : "light" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await settle(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const file = join(out, `w${w}${dark ? "-dark" : ""}.png`);
  await page.screenshot({ path: file, fullPage: true });
  saved.push(file);
  if (overflow > 1) console.log(`! ${w}px: horizontal overflow of ${overflow}px`);

  if (scrollFrames && w === widths[widths.length - 1]) {
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    for (let i = 0; i <= scrollFrames; i++) {
      const y = Math.round((total * i) / scrollFrames);
      await page.mouse.wheel(0, y - (await page.evaluate(() => scrollY)));
      await page.waitForTimeout(450);
      const f = join(out, `scroll-${String(i).padStart(2, "0")}.png`);
      await page.screenshot({ path: f });
      saved.push(f);
    }
  }
  await ctx.close();
}

// Reduced-motion capture at the narrowest width
{
  const w = Math.min(...widths);
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await settle(page);
  const file = join(out, `w${w}-reduced-motion.png`);
  await page.screenshot({ path: file, fullPage: true });
  saved.push(file);

  if (wantAxe) {
    let source = null;
    try { source = readFileSync(resolveFromProject("axe-core/axe.min.js"), "utf8"); } catch {}
    if (!source) {
      try {
        const { execSync } = require("node:child_process");
        const root = execSync("npm root -g", { encoding: "utf8" }).trim();
        const p = join(root, "axe-core", "axe.min.js");
        if (existsSync(p)) source = readFileSync(p, "utf8");
      } catch {}
    }
    if (!source) {
      console.log("axe-core not installed (npm i -D axe-core); skipping the automated accessibility scan.");
    } else {
      await page.addScriptTag({ content: source });
      const result = await page.evaluate(async () => await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] }));
      const file = join(out, "axe.json");
      writeFileSync(file, JSON.stringify(result.violations, null, 2));
      saved.push(file);
      console.log(`axe: ${result.violations.length} rule violations (${result.violations.reduce((n, v) => n + v.nodes.length, 0)} nodes)`);
      for (const v of result.violations) console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
    }
  }
  await ctx.close();
}

await browser.close();
console.log(`Saved ${saved.length} files to ${out}`);
for (const f of saved) console.log(`  ${f}`);
