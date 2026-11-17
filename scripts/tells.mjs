#!/usr/bin/env node
// Atelier — tells.mjs
// Static sweep for common UI defects and generated-look tells in HTML, CSS and component files.
// No dependencies. Findings are leads, not verdicts: a pinned brief can justify a flagged pattern.
//
// Usage:
//   node tells.mjs <path> [more paths...] [--json] [--only defects|tells] [--strict]
//   --strict  exit with code 1 when any blocker or major defect is found (useful in CI)

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const EXTS = new Set([".html", ".htm", ".css", ".scss", ".sass", ".less", ".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", ".svelte-kit", ".astro", "coverage", ".atelier", ".turbo", "out", "vendor"]);

// kind: "defect" (quality/accessibility) or "tell" (generated-look default)
// level: blocker | major | minor | note
const RULES = [
  // ---- defects
  { id: "zoom-disabled", kind: "defect", level: "blocker", re: /user-scalable\s*=\s*["']?(no|0)\b|maximum-scale\s*=\s*["']?1(\.0)?\b/i,
    msg: "Zoom disabled in the viewport meta. Remove user-scalable=no / maximum-scale=1; fix input font size instead (WCAG 1.4.4)." },
  { id: "outline-removed", kind: "defect", level: "major", re: /outline\s*:\s*(none|0)\b|\boutline-none\b|\bfocus:outline-none\b/,
    msg: "Focus outline removed. Make sure a visible :focus-visible style replaces it (WCAG 2.4.7)." },
  { id: "img-no-alt", kind: "defect", level: "major", re: /<img\b(?![^>]*\balt\s*=)[^>]*>/i,
    msg: "<img> without alt. Add meaningful alt text, or alt=\"\" if decorative (WCAG 1.1.1)." },
  { id: "positive-tabindex", kind: "defect", level: "major", re: /tab[iI]ndex\s*=\s*["{']?\s*[1-9]/,
    msg: "Positive tabindex breaks the natural focus order. Use 0 or -1 and fix DOM order (WCAG 2.4.3)." },
  { id: "clickable-div", kind: "defect", level: "major", re: /<(div|span|li)\b(?![^>]*\brole\s*=)[^>]*\bon(Click|click)\s*=/,
    msg: "Click handler on a non-interactive element without a role. Use <button> or <a href> (WCAG 2.1.1, 4.1.2)." },
  { id: "autoplay-unmuted", kind: "defect", level: "major", re: /<video\b(?=[^>]*\bautoplay)(?![^>]*\bmuted)[^>]*>/i,
    msg: "Autoplaying video without muted. Mute it and provide a pause control (WCAG 1.4.2, 2.2.2)." },
  { id: "placeholder-only", kind: "defect", level: "minor", re: /<input\b(?=[^>]*\bplaceholder\s*=)(?![^>]*\b(aria-label|aria-labelledby|id)\s*=)[^>]*>/i,
    msg: "Input with a placeholder but no id/aria-label: probably no real label. Add a visible <label> (WCAG 3.3.2)." },
  { id: "transition-all", kind: "defect", level: "minor", re: /transition(-property)?\s*:\s*all\b|\btransition-all\b/,
    msg: "transition: all. List the animated properties (usually transform, opacity)." },
  { id: "scale-from-zero", kind: "defect", level: "minor", re: /scale\(\s*0\s*\)|\bscale-0\b/,
    msg: "Animating from scale(0). Start from about scale(0.95) with opacity 0." },
  { id: "ease-in-ui", kind: "defect", level: "minor", re: /\bease-in\b(?!-out)/,
    msg: "ease-in on UI motion feels laggy. Use ease-out (entering) or ease-in-out (moving)." },
  { id: "vh-100", kind: "defect", level: "minor", re: /\b100vh\b|\bh-screen\b|\bmin-h-screen\b/,
    msg: "100vh jumps on mobile browsers. Prefer 100svh or 100dvh with 100vh as fallback." },
  { id: "long-duration", kind: "defect", level: "minor", re: /transition[^;{}]*\b(4[5-9]\d|[5-9]\d\d|\d{4,})ms\b/,
    msg: "Transition longer than ~450 ms. UI motion usually stays under 300 ms." },
  { id: "bg-fixed", kind: "defect", level: "minor", re: /background-attachment\s*:\s*fixed/,
    msg: "background-attachment: fixed is janky or ignored on mobile. Use a fixed pseudo-element or transform parallax." },
  { id: "small-text", kind: "defect", level: "note", re: /font-size\s*:\s*(([0-9]|1[01])px|0\.(5|6|6[0-9]*)rem)\b|\btext-\[(\d|1[01])px\]/,
    msg: "Very small text (under 12 px). Check readability and contrast." },

  // ---- tells
  { id: "parchment-cream", kind: "tell", level: "note", re: /#f4f1ea\b|#f5f0e8\b|#faf7f2\b/i,
    msg: "Warm parchment ground: a common generated default. Keep only if the subject calls for it." },
  { id: "claude-terracotta", kind: "tell", level: "note", re: /#d97757\b|#cc785c\b|#da7756\b/i,
    msg: "Terracotta near Claude's own accent: reads as the tool's signature on a client page." },
  { id: "tinted-near-black", kind: "tell", level: "note", re: /#(0a0a0a|0b0b0b|0c0c0c|0d0d0d|111111|111)\b/i,
    msg: "Tinted near-black standing in for black. Choose a dark tied to the palette's hue, on purpose." },
  { id: "gradient-text", kind: "tell", level: "note", re: /background-clip\s*:\s*text|\bbg-clip-text\b/,
    msg: "Gradient text: a frequent generated-look tell." },
  { id: "purple-gradient", kind: "tell", level: "note", re: /\b(from|via)-(purple|violet|indigo|fuchsia)-\d{2,3}\b|linear-gradient\([^)]*(purple|violet|#8b5cf6|#7c3aed|#a855f7|#6366f1)/i,
    msg: "Purple/indigo gradient wash: a frequent default. Does the subject's palette call for it?" },
  { id: "eyebrow-caps", kind: "tell", level: "note", re: /\buppercase\b[^"'`\n]*\btracking-(widest|wider|\[0\.[1-9])|text-transform\s*:\s*uppercase[^}]*letter-spacing\s*:\s*0?\.[1-9]/,
    msg: "Tracked all-caps eyebrow label. Keep only where the label carries real information." },
  { id: "middle-dot-meta", kind: "tell", level: "note", re: />[^<]{1,40}\s·\s[^<]{1,40}\s·\s[^<]{1,40}</,
    msg: "Middle-dot meta string (A · B · C): a template ornament." },
  { id: "arrow-cta", kind: "tell", level: "note", re: /(<(a|button|Link|Button)\b[^>]*>[^<]{1,40}\s?→\s*<\/)|(→\s*<\/(a|button|Link|Button)>)/,
    msg: "Arrow appended to link/button text. Is it doing a job here?" },
  { id: "soft-shadow-kit", kind: "tell", level: "note", re: /box-shadow\s*:[^;]*rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.1\s*\)/,
    msg: "The default soft grey shadow. If every card has it, it is the SaaS card kit." },
  { id: "buzzword-copy", kind: "tell", level: "note", re: />[^<]*\b(Unlock|Elevate|Supercharge|Seamless(ly)?|Effortless(ly)?|Next-level|Revolutionize|Game-changing|Unleash)\b[^<]*</,
    msg: "Generic marketing verb. Replace with something specific to the subject." },
];

function walk(p, out) {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) {
      if (SKIP_DIRS.has(name) || name.startsWith(".") && name !== "." ) continue;
      walk(join(p, name), out);
    }
  } else if (EXTS.has(extname(p).toLowerCase()) && !/\.min\.(js|css)$/.test(p) && st.size < 2_000_000) {
    out.push(p);
  }
}

const args = process.argv.slice(2);
const json = args.includes("--json");
const strict = args.includes("--strict");
const onlyIdx = args.indexOf("--only");
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
const paths = args.filter((a, i) => !a.startsWith("--") && !(onlyIdx >= 0 && i === onlyIdx + 1));

if (!paths.length) {
  console.error("Usage: node tells.mjs <path> [more paths...] [--json] [--only defects|tells] [--strict]");
  process.exit(2);
}

const files = [];
for (const p of paths) walk(p, files);

const findings = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const hasFocusVisible = /focus-visible/.test(text);
  for (const rule of RULES) {
    if (only === "defects" && rule.kind !== "defect") continue;
    if (only === "tells" && rule.kind !== "tell") continue;
    lines.forEach((line, i) => {
      if (line.length > 2000) return; // skip minified lines
      if (!rule.re.test(line)) return;
      if (rule.id === "outline-removed" && hasFocusVisible) return;
      if (rule.id === "eyebrow-caps" && /sr-only/.test(line)) return;
      findings.push({ file: relative(process.cwd(), file) || file, line: i + 1, id: rule.id, kind: rule.kind, level: rule.level, message: rule.msg, excerpt: line.trim().slice(0, 140) });
    });
  }
}

const order = { blocker: 0, major: 1, minor: 2, note: 3 };
findings.sort((a, b) => order[a.level] - order[b.level] || a.file.localeCompare(b.file) || a.line - b.line);

if (json) {
  console.log(JSON.stringify({ files: files.length, findings }, null, 2));
} else {
  const count = (lvl) => findings.filter((f) => f.level === lvl).length;
  console.log(`Atelier tells: ${files.length} files scanned, ${findings.length} findings ` +
    `(blocker ${count("blocker")}, major ${count("major")}, minor ${count("minor")}, note ${count("note")})\n`);
  for (const f of findings) {
    console.log(`[${f.level.toUpperCase()}] ${f.kind === "tell" ? "tell" : "defect"}:${f.id}  ${f.file}:${f.line}`);
    console.log(`  ${f.message}`);
    console.log(`  > ${f.excerpt}\n`);
  }
  if (!findings.length) console.log("Nothing flagged. Still run the visual and checklist passes.");
}

if (strict && findings.some((f) => f.level === "blocker" || f.level === "major")) process.exit(1);
