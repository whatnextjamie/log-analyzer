import { readFile as fsReadFile } from "fs/promises";

export async function readFile({
  filePath,
  startLine,
  endLine,
}: {
  filePath: string;
  startLine?: number;
  endLine?: number;
}) {
  try {
    const content = await fsReadFile(filePath, "utf-8");
    const lines = content.split("\n");

    const start = (startLine ?? 1) - 1;
    const end = endLine ?? lines.length;
    const selectedLines = lines.slice(start, end);

    return {
      filePath,
      lineRange: [start + 1, Math.min(end, lines.length)],
      content: selectedLines
        .map((line, i) => `${start + i + 1}: ${line}`)
        .join("\n"),
    };
  } catch (e) {
    return { error: `Could not read file: ${filePath}` };
  }
}
