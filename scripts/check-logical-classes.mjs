// Fails when app code uses physical left/right Tailwind classes instead of logical ones
// (ms-/me-/ps-/pe-/start-/end-/text-start…), which break the Arabic RTL layout.
// shadcn primitives in src/components/ui are vendored and skipped.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.argv[2] ?? "src";
const SKIP = [join("src", "components", "ui")];
const SUFFIX = String.raw`-[\w./[\]%-]+`;
const PHYSICAL = new RegExp(
  String.raw`(?<=^|[\s"'\`:])!?-?(?:` +
    [
      String.raw`(?:scroll-)?[mp][lr]${SUFFIX}`,
      String.raw`(?:left|right)${SUFFIX}`,
      String.raw`(?:border-[lr]|rounded-(?:[lr]|tl|tr|bl|br))(?:${SUFFIX})?`,
      String.raw`(?:text|float|clear)-(?:left|right)`,
    ].join("|") +
    String.raw`)(?=$|[\s"'\`])`,
  "gm",
);

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (SKIP.includes(path)) continue;
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(tsx|ts|jsx|js|css)$/.test(name)) yield path;
  }
}

let failures = 0;
for (const file of files(ROOT)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const match of line.matchAll(PHYSICAL)) {
        failures++;
        console.error(`${relative(".", file)}:${index + 1}  ${match[0]}`);
      }
    });
}

if (failures) {
  console.error(`\n${failures} physical direction class(es) found; use logical classes instead.`);
  process.exit(1);
}
console.log("No physical left/right classes found.");
