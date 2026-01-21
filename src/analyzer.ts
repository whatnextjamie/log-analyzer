import { readUIMessageStream, stepCountIs, streamText } from "ai";

const TEST_ERROR = `Error: Connection refused to database primary-db-01.prod.internal:5432
    at PostgresConnection.connect (/app/src/db/connection.ts:47:11)
    at async Pool.getConnection (/app/src/db/pool.ts:89:5)
    at async UserService.findById (/app/src/services/user.ts:23:18)
    at async AuthMiddleware.validateToken (/app/src/middleware/auth.ts:56:22)
    at async /app/src/routes/api.ts:12:5

Timestamp: 2024-01-15T14:32:01.847Z
Request ID: req-abc123
Pod: api-server-7d4f8b9c6-x2k9m`;

const SYSTEM_PROMPT = `You are a senior SRE debugging a production incident. You have access to tools to investigate.

Your approach:
1. First, parse any stack traces to understand the error origin
2. Search logs for related errors and patterns
3. Read relevant source files if needed
4. Correlate timestamps to identify the root cause
5. Provide a clear diagnosis and actionable next steps

Be methodical. Show your reasoning. When you call a tool, briefly explain why.`;

export { TEST_ERROR };

export async function analyze(input: string) {
  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(10),
    prompt: `Investigate this error:\n\n${input}`,
  });

  for await (const message of readUIMessageStream({
    stream: result.toUIMessageStream(),
  })) {
    console.log("Current message state:", message);
  }
}
