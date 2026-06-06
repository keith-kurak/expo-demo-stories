#!/usr/bin/env node

const path = require("path");
const fs = require("fs/promises");
const { execSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");

const usage = () => {
  console.log("Usage: node scripts/push-update.js --message <msg> [--critical] [--channel <ch>] [--platform <ios|android>]");
  console.log();
  console.log("  --message, -m   (required) Update message");
  console.log("  --critical, -c  (optional) Mark this as a critical update");
  console.log("  --channel, -ch  (optional) Channel name (default: preview)");
  console.log("  --platform, -p  (optional) ios or android (default: all)");
};

async function incrementCriticalIndex(critical) {
  const indexPath = path.join(projectRoot, ".criticalIndex");
  let current = 0;
  try {
    const text = await fs.readFile(indexPath, "utf-8");
    current = parseInt(text, 10) || 0;
  } catch {}
  const updated = critical ? current + 1 : current;
  await fs.writeFile(indexPath, `${updated}`, "utf-8");
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

  // Increment .criticalIndex if --critical flag is set.
  // app.config.js reads this file dynamically, so no config file edits needed.
  const criticalIndex = await incrementCriticalIndex(critical);
  console.log(`criticalIndex: ${criticalIndex}`);

  // Build the eas update command
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
