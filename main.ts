// One-Line Office Joke: 24-Hour Sprint — make.fun program/v1 entry.
//
// Writes exactly one joke line to $MAKEFUN_OUTPUT_DIR/entry.txt
// ("./entry.txt" when the variable is unset), creating the output
// directory first when needed. Fully deterministic: no clock, no
// randomness, no network, no environment secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";

// The entry: one fresh line about office life.
const JOKE =
  "The office plant has survived three managers, two restructures and a round of layoffs, so HR listed it as our most stable employee.";

// Gate the entry the way the bounty does: exactly one line, 1-200
// Unicode code points, never whitespace-only.
const codePoints = [...JOKE].length;
if (
  JOKE.includes("\n") ||
  codePoints < 1 ||
  codePoints > 200 ||
  JOKE.trim().length === 0
) {
  throw new Error(`invalid entry: ${codePoints} code points`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
