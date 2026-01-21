import type { UIMessage } from "ai";

let lastTextLength = 0;
const renderedToolCalls = new Set<string>();

export function renderMessage(message: UIMessage) {
  for (const part of message.parts) {
    if (part.type === "text") {
      const newText = part.text.slice(lastTextLength);
      if (newText) {
        lastTextLength = part.text.length;
        process.stdout.write(newText);
      }
    } else if (part.type.startsWith("tool-")) {
      const toolPart = part as { toolCallId: string; state: string; title?: string; input?: unknown; output?: unknown };
      const callKey = `${toolPart.toolCallId}-${toolPart.state}`;
      if (!renderedToolCalls.has(callKey)) {
        renderedToolCalls.add(callKey);
        if (toolPart.state === "call") {
          console.log(
            `\n\n🔧 ${toolPart.title ?? "tool"}(${JSON.stringify(toolPart.input, null, 2)})\n`,
          );
        } else if (toolPart.state === "result") {
          const preview = truncate(JSON.stringify(toolPart.output), 200);
          console.log(`   └─ ${preview}\n`);
        }
      }
    }
  }
}

function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len) + "..." : str;
}
