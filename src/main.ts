// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
 let startState = initState();
 await startREPL(startState);
}

main();