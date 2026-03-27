import { createInterface } from 'readline';
import { commandExit, commandHelp, getCommands } from './command_center.js';
import { State } from './state.js';
export function cleanInput(input: string): string[] {
let listing: string[] = []
let applied = input.toLowerCase().split(" ")
listing.push(...applied);
let cleaned = listing.filter(item => item != ""); 
return cleaned;
}
export async function startREPL(state: State) {
let rl = state.readline
rl.prompt(); 
rl.on("line", async (input: string) =>{
  const parse = cleanInput(input);
  if (parse.length == 0) {
  rl.prompt();
  return;  
  }
  let cmd = state.commands;
  let commandName = cmd[parse[0]];
  if (!commandName) {
    console.log("command not found!... run the [help] command")
    rl.prompt();
    return;
  }
  try {
  await commandName.callback(state);
  rl.prompt();
  } catch (err) {
  console.log((err as Error).message)
  }
});
}