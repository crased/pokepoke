export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const resp = await fetch(fullURL, {
    method: 'GET',
    })
    resp.ok;
    let data = await resp.json();
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/locationName/`
    const resp = await fetch(fullURL, {
    method: 'GET',
    })
    resp.ok;
    let data = await resp.json();
    return data;
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
  // add properties here
};