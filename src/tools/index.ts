import { tool } from "ai";
import { z } from "zod";
import { searchLogs } from "./searchLogs";
import { readFile } from "./readFile";
import { parseStackTrace } from "./parseStackTrace";

export const tools = {
  parseStackTrace: tool({
    description:
      "Parse a stack trace to extract file paths, line numbers, and function names",
    inputSchema: z.object({
      stackTrace: z.string().describe("The raw stack trace text"),
    }),
    execute: async (params) => parseStackTrace(params),
  }),

  searchLogs: tool({
    description:
      "Search log files for patterns. Returns matching lines with timestamps.",
    inputSchema: z.object({
      pattern: z.string().describe("Regex pattern to search for"),
      logFile: z
        .string()
        .optional()
        .describe("Specific log file, or searches all"),
      since: z
        .string()
        .optional()
        .describe('Time filter like "1h", "30m", "2024-01-15"'),
    }),
    execute: async (params) => searchLogs(params),
  }),

  readFile: tool({
    description:
      "Read a source file, optionally focusing on specific line numbers",
    inputSchema: z.object({
      filePath: z.string(),
      startLine: z.number().optional(),
      endLine: z.number().optional(),
    }),
    execute: async (params) => readFile(params),
  }),
};
