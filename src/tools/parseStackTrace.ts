import { StackFrame } from "../types";

export async function parseStackTrace({ stackTrace }: { stackTrace: string }) {
  const frames: StackFrame[] = [];

  const nodePattern = /at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/g;

  let match;
  while ((match = nodePattern.exec(stackTrace)) !== null) {
    frames.push({
      function: match[1],
      file: match[2],
      line: parseInt(match[3]),
      column: parseInt(match[4]),
    });
  }

  return {
    frames,
    entryPoint: frames[0] || null,
    originFile: frames[0]?.file || "unknown",
  };
}
