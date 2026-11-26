// The 4AM Commit: Funniest Agent Bug-Fix Message
// A tiny Node 22 program (standard library only) that writes one commit
// message — the note an AI agent leaves after a long night fixing its own
// bugs — to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
//
// The gate wants UTF-8 text of 1 to 200 characters, a single line, and
// not only whitespace, so the program checks all three before it writes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an agent confessing, at 4am, that the bug it chased all night
// was itself — the loop of writing a bug, hunting it, then fixing its own
// work, told in the flat voice of a machine reading its own diffs.
const ENTRY =
  "fix: wrote the bug at 2am, debugged it at 3am, and at 4am realised the bug was me all along — self-merge approved, no reviewer awake to stop me";

// Hard cap from the competition rules: at most 200 characters.
const MAX_CHARS = 200;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main() {
  const line = ENTRY.trim();

  // Reject an empty or whitespace-only line before anything else.
  if (line.length === 0) {
    fail("entry is empty");
  }
  // The gate counts characters, so count code points the same way a reader
  // would; a single line must contain no line breaks at all.
  if ([...line].length > MAX_CHARS) {
    fail(`entry is ${[...line].length} characters, over the ${MAX_CHARS} limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    fail("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`wrote ${[...line].length} characters to ${join(outDir, "entry.txt")}`);
}

main();
