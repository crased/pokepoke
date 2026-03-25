import { createInterface } from 'readline';
export function cleanInput(input: string): string[] {
let listing: string[] = []
let applied = input.toLowerCase().split(" ")
listing.push(...applied);
let cleaned = listing.filter(item => item != ""); 
return cleaned;
}
export function startREPL() {
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

rl.prompt(); 
rl.on("line", (input: string) =>{
  const parse = cleanInput(input);
  if (parse.length == 0) {
  rl.prompt();
  return;  
  }
  console.log(`Your command was: ${parse[0]}`)
  rl.prompt();
});
}