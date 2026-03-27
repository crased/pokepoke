import { State } from "./state.js";
export async function commandExit(state: State) {
console.log("Closing the Pokedex... Goodbye!");
state.readline.close();
process.exit(0);
};
export async function commandHelp(state: State) {
console.log("Welcome to the Pokedex!\nUsage:\n");
for (const cmd of Object.values(state.commands)) {
   console.log(`${cmd.name}: ${cmd.description}`);
}};
export async function commandMap(state: State) {
const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
state.nextLocationsURL = data.next;
state.prevLocationsURL = data.previous;
for (const location of data.results) {
console.log(location.name)  
}
};
export async function commandMapb(state: State) {
if (!state.prevLocationsURL) {
console.log("you're on the first page")
return;
}
const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
state.nextLocationsURL = data.next;
state.prevLocationsURL = data.previous;
for (const location of data.results) {
console.log(location.name)
}
};

export function getCommands() {
  return { 
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
    help: {
      name: "help",
      description: "Displays a help message", 
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "displays next locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "displays previous locations",
      callback: commandMapb,
    }
  };
}