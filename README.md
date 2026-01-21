# Log Analyzer

An AI-powered CLI tool that analyzes log files and stack traces to help debug production incidents.

## Setup

```bash
npm install
```

Create a `.env` file with your API key:

```
AI_GATEWAY_API_KEY=your_key_here
```

## Usage

```bash
# Analyze a log file
npm start path/to/logfile.log

# Or pipe input directly
cat error.log | npm start
echo "Error: something failed" | npm start
```

## How It Works

The analyzer uses an AI model with access to three tools:

- **parseStackTrace** - Extracts file paths, line numbers, and function names from stack traces
- **searchLogs** - Searches log files for patterns using grep
- **readFile** - Reads source files to examine code at specific line numbers

The AI acts as an SRE, methodically investigating errors by parsing traces, correlating log patterns, and examining relevant source code to provide a diagnosis and actionable next steps.
