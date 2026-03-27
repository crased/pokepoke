import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_center.js";
import { PokeAPI } from "./pokeapi.js";
import { Url } from "url";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface,
  commands: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  nextLocationsURL: string,
  prevLocationsURL: string,
}

export function initState() {
const rl = createInterface({ input: process.stdin, output: process.stdout,prompt: "Pokedex > ",});
const commands = getCommands();
return {
 readline: rl,
 commands: commands,
 pokeAPI: new PokeAPI(),
 nextLocationsURL: "",
 prevLocationsURL: "",
};
}