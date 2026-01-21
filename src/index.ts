import "dotenv/config";
import { analyze, TEST_ERROR } from "./analyzer";

console.log("Log Analyzer Started");
console.log("---");

analyze(TEST_ERROR);
