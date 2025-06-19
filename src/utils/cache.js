import { cache } from "cache-manager";

export const cacheManager = cache({
    store: "memory",
    max: 100, // Maximo de elementos en caché
    ttl: 5 * 60 * 1000, // Tiempo de vida 5 minutos
});