import "dotenv/config";
import { analyze } from "./analyzer";

async function main() {
  const input = await getInput();
  await analyze(input);
}

async function getInput(): Promise<string> {
  // Check if data is being piped in
  if (!process.stdin.isTTY) {
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf-8");
  }

  // Otherwise, check for file argument
  const filePath = process.argv[2];
  if (filePath) {
    const fs = await import("fs/promises");
    return fs.readFile(filePath, "utf-8");
  }

  console.error("Usage: log-analyzer <file> or pipe input");
  process.exit(1);
}

main();
