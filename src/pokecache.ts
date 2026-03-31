export type CacheEntry<T> = {
createdAt: number,
val: T,
};


export class Cache {
#cache = new Map<string, CacheEntry<any>>();
#reapIntervalId: NodeJS.Timeout | undefined = undefined;
#interval: number;

add<T>(key: string, val: T) {
const entry: CacheEntry<T> = {
createdAt: Date.now(),
val: val, 
};
this.#cache.set(key, entry);
};

get<T>(key: string) {
const entry = this.#cache.get(key);
if (entry !== undefined) return entry.val; 
return undefined;
};

#reap() { 
const aging = Date.now() - this.#interval;
this.#cache.forEach((entry, key) => {
if (entry.createdAt < aging ) {
this.#cache.delete(key);
}});};

#startReapLoop() {
this.#reapIntervalId = setInterval(() => {
 this.#reap();
}, this.#interval);
};

constructor(interval: number) {
this.#interval = interval;
this.#startReapLoop();
}

stopReapLoop() {
clearInterval(this.#reapIntervalId); 
this.#reapIntervalId = undefined;
}
};
