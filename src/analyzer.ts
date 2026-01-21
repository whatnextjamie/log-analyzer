import { readUIMessageStream, stepCountIs, streamText } from "ai";
import { tools } from "./tools/index";
import { renderMessage } from "./ui/renderer";

const SYSTEM_PROMPT = `You are a senior SRE debugging a production incident. You have access to tools to investigate.

Your approach:
1. First, parse any stack traces to understand the error origin
2. Search logs for related errors and patterns
3. Read relevant source files if needed
4. Correlate timestamps to identify the root cause
5. Provide a clear diagnosis and actionable next steps

Be methodical. Show your reasoning. When you call a tool, briefly explain why.`;

export async function analyze(input: string) {
  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: SYSTEM_PROMPT,
    tools,
    stopWhen: stepCountIs(10),
    prompt: `Investigate this error:\n\n${input}`,
  });

  for await (const message of readUIMessageStream({
    stream: result.toUIMessageStream(),
  })) {
    renderMessage(message);
  }
}
