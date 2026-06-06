#!/usr/bin/env node

const path = require("path");
const fs = require("fs/promises");
const { execSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const appJsonPath = path.join(projectRoot, "app.json");

const usage = () => {
  console.log("Usage: node scripts/push-update.js --message <msg> [--critical] [--channel <ch>] [--platform <ios|android>]");
  console.log();
  console.log("  --message, -m   (required) Update message");
  console.log("  --critical, -c  (optional) Mark this as a critical update");
  console.log("  --channel, -ch  (optional) Channel name (default: preview)");
  console.log("  --platform, -p  (optional) ios or android (default: all)");
};

async function updateCriticalIndex(critical) {
  const raw = await fs.readFile(appJsonPath, "utf-8");
  const appJson = JSON.parse(raw);
  const current = appJson.expo.extra?.criticalIndex ?? 0;
  const updated = critical ? current + 1 : current;
  appJson.expo.extra = { ...appJson.expo.extra, criticalIndex: updated };
  await fs.writeFile(appJsonPath, JSON.stringify(appJson, null, 2) + "\n", "utf-8");
  return updated;
}

async function main() {
  const args = process.argv.slice(2);
  let message = "";
  let critical = false;
  let channel = "preview";
  let platform = null;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--message":
      case "-m":
        message = args[++i];
        break;
      case "--critical":
      case "-c":
        critical = true;
        break;
      case "--channel":
      case "-ch":
        channel = args[++i];
        break;
      case "--platform":
      case "-p":
        platform = args[++i];
        break;
    }
  }

  if (!message) {
    usage();
    process.exit(1);
  }

  console.log(`message: ${message}`);
  console.log(`critical: ${critical}`);
  console.log(`channel: ${channel}`);
  console.log(`platform: ${platform ?? "all"}`);

  const criticalIndex = await updateCriticalIndex(critical);
  console.log(`criticalIndex: ${criticalIndex}`);

  const easArgs = [
    "update",
    `--message=${message}`,
    `--channel=${channel}`,
  ];
  if (platform) {
    easArgs.push(`--platform=${platform}`);
  }

  console.log(`\nRunning: eas ${easArgs.join(" ")}\n`);

  execSync(`eas ${easArgs.join(" ")}`, {
    cwd: projectRoot,
    stdio: "inherit",
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
