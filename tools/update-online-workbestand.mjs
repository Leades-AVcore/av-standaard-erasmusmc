#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const workfilePath = path.join(rootDir, "pve_werkbestand_basis.json");
const appPath = path.join(rootDir, "app.js");
const backupDir = path.join(rootDir, ".online-backups");

const args = process.argv.slice(2);
const inputArg = args.find((arg) => !arg.startsWith("--"));
const shouldPush = args.includes("--push");

function fail(message) {
  console.error(`\n${message}\n`);
  console.error("Gebruik:");
  console.error("  node tools/update-online-workbestand.mjs /pad/naar/export.json --push");
  process.exit(1);
}

function run(command, argsToRun) {
  execFileSync(command, argsToRun, { cwd: rootDir, stdio: "inherit" });
}

function assertArray(data, key) {
  if (!Array.isArray(data[key])) {
    fail(`Het gekozen bestand lijkt geen geldig dashboard-werkbestand: '${key}' ontbreekt.`);
  }
}

if (!inputArg) {
  fail("Geen JSON-bestand opgegeven.");
}

const inputPath = path.resolve(process.cwd(), inputArg);
const raw = await readFile(inputPath, "utf8").catch(() => fail(`Kan bestand niet lezen: ${inputPath}`));
let data;

try {
  data = JSON.parse(raw);
} catch {
  fail("Het gekozen bestand is geen geldige JSON.");
}

assertArray(data, "requirements");
assertArray(data, "outcomes");
assertArray(data, "solutions");
assertArray(data, "standardParts");

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, "-");
const version = `online-${stamp}`;
const backupPath = path.join(backupDir, `pve_werkbestand_basis.${stamp}.json`);

await mkdir(backupDir, { recursive: true });
await copyFile(workfilePath, backupPath).catch(() => {});

data.meta = {
  ...(data.meta || {}),
  baseFileVersion: version,
  updatedAt: now.toISOString(),
  onlineUpdatedAt: now.toISOString(),
  onlineSourceFile: path.basename(inputPath)
};

data.logs = Array.isArray(data.logs) ? data.logs : [];
const nextLogNumber = data.logs.reduce((highest, item) => {
  const match = String(item.id || "").match(/^LOG-(\d+)$/);
  return match ? Math.max(highest, Number(match[1])) : highest;
}, 0) + 1;
data.logs.push({
  id: `LOG-${String(nextLogNumber).padStart(4, "0")}`,
  at: now.toISOString(),
  actor: "Online update-script",
  action: "basis:update",
  entityType: "dashboard",
  entityId: "pve_werkbestand_basis",
  summary: `Online basiswerkbestand bijgewerkt vanuit ${path.basename(inputPath)}`
});

await writeFile(workfilePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

const app = await readFile(appPath, "utf8");
const updatedApp = app.replace(
  /const APP_BASE_FILE_VERSION = "([^"]+)";/,
  `const APP_BASE_FILE_VERSION = "${version}";`
);

if (app === updatedApp) {
  fail("Kon APP_BASE_FILE_VERSION niet vinden in app.js.");
}

await writeFile(appPath, updatedApp, "utf8");

console.log(`Nieuwe online basis ingesteld: ${version}`);
console.log(`Backup lokaal opgeslagen in: ${backupPath}`);

if (shouldPush) {
  run("git", ["add", "app.js", "pve_werkbestand_basis.json"]);
  run("git", ["commit", "-m", `Update online werkbestand ${stamp}`]);
  run("git", ["push", "origin", "main"]);
  run("git", ["push", "origin", "main:gh-pages"]);
  console.log("\nOnline versie is bijgewerkt. GitHub Pages kan enkele minuten cache gebruiken.");
} else {
  console.log("\nControleer de wijziging en push daarna handmatig, of draai opnieuw met --push.");
}
