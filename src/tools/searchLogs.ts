import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function searchLogs({
  pattern,
  logFile = "/var/log/*.log", // Default, make configurable
  since,
}: {
  pattern: string;
  logFile?: string;
  since?: string;
}) {
  try {
    // Simple grep-based search — swap with actual log source
    const { stdout } = await execAsync(
      `grep -rn "${pattern}" ${logFile} 2>/dev/null | head -50`,
    );

    const lines = stdout.trim().split("\n").filter(Boolean);

    return {
      matchCount: lines.length,
      matches: lines.slice(0, 20), // Limit what we send to the model
      truncated: lines.length > 20,
    };
  } catch (e) {
    return { matchCount: 0, matches: [], error: "No matches or search failed" };
  }
}
