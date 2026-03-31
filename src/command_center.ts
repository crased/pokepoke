import { State } from "./state.js";
export async function commandExit(state: State): Promise<void> {
console.log("Closing the Pokedex... Goodbye!");
state.readline.close();
process.exit(0);
};
export async function commandHelp(state: State): Promise<void> {
console.log("Welcome to the Pokedex!\nUsage:\n");
for (const cmd of Object.values(state.commands)) {
   console.log(`${cmd.name}: ${cmd.description}`);
}};
export async function commandMap(state: State): Promise<void> {
const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
state.nextLocationsURL = data.next;
state.prevLocationsURL = data.previous;
for (const location of data.results) {
console.log(location.name)  
}
};
export async function commandMapb(state: State): Promise<void> {
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
export async function commandExplore(state: State, ...args: string[]): Promise<void> {
const name = args[0];
if (name.length == 0) {
console.log("please provide a location name");  
return;  
}
const data = await state.pokeAPI.fetchLocation(name);
for (const enc of data.pokemon_encounters) {
  console.log(enc.pokemon.name);
}
};
export async function commandCatch(state: State, ...args: string[]): Promise<void> {
if (args.length !== 1) {
console.log("please provide a pokemon name")
return;  
}
const name = args[0];
console.log(`Throwing a Pokeball at ${name}...`)
const data = await state.pokeAPI.fetchPokemon(name);
let catchRate = Math.random();
const chance = data.base_experience;
if (chance > catchRate) {
  state.pokedex[data.name] = data
  console.log(`Congratulations you've caught ${name}`)
  return;
}
console.log(`The wild ${name} escaped!!`)
};

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  const name = args[0]
  if (name.length == 0) { 
     console.log("you havn't searched for a name")
     return;
  }
  if (!(name in state.pokedex)) {
    console.log(`you have not captured ${name}`)
    return undefined;
  }
  const pokemon = state.pokedex[name]
  console.log(`Name: ${name}`)
  console.log(`Height: ${pokemon.height}`)
  console.log(`Weight: ${pokemon.weight}`)
  console.log("Stats:")
  for (const stat of pokemon.stats) {
  console.log(` -${stat.stat.name}: ${stat.base_stat}`)
  } console.log("Types:")
  for (const type of pokemon.types) {
  console.log(` - ${type.type.name}`)  
  }
};
export async function commandPokedex(state: State): Promise<void> {
for (const pokemon of Object.values(state.pokedex)) {
  console.log(`- ${pokemon.name}`)
}



};
export function getCommands() {
  return { 
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
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
    },
    explore: {
      name: "explore",
      description: "list pokemon you can find at location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "attempts to catch pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "inspects caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "displays all pokemon you've captured",
      callback: commandPokedex, 
    },
  };
}