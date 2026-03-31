import { Cache as PokeCache} from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: PokeCache;
  
  constructor(cacheInterval: number) {
  this.#cache = new PokeCache(cacheInterval);  
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const cached = this.#cache.get(pageURL || `${PokeAPI.baseURL}/location-area/`);
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`
    if (cached !== undefined) {
      return cached;
    }
    const resp = await fetch(fullURL, {
    method: 'GET',
    })
    if (!resp.ok) {
      throw new Error(resp.statusText)
    };
    let data = await resp.json();
    this.#cache.add(fullURL, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const cached = this.#cache.get(`${PokeAPI.baseURL}/location-area/${locationName}/`)
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}/`
     if (cached !== undefined) {
      return cached;
    }
    const resp = await fetch(fullURL, {
    method: 'GET',
    })
    if (!resp.ok) {
      throw new Error(resp.statusText)
    };
    let data = await resp.json();
    this.#cache.add(fullURL, data);
    return data;
  }
 async fetchPokemon(name: string): Promise<Pokemon> {
   const cached = this.#cache.get(`${PokeAPI.baseURL}/pokemon/${name}`)
   const fullURL = `${PokeAPI.baseURL}/pokemon/${name}`
   if (cached !== undefined) {
    return cached;
  }
  const resp = await fetch(fullURL, {
  method: 'GET',  
  })
  if (!resp.ok) {
      throw new Error(resp.statusText)
  };
  const data: Pokemon = await resp.json();
  this.#cache.add(fullURL, data);
  return data
 }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string; 
  }[];
};

export type Location = {
 pokemon_encounters: {
  pokemon: {
  name:string
  };}[];
};

export type Pokemon = {
name:string,
base_experience: number,
height: number,
weight: number,
stats: {
 base_stat: number,
 stat: {
   name: string,
 };
}[],
types: {
  type: {
    name: string,
  }
}[],
};
