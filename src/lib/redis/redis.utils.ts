import redisClient from './redis.client';
import handleRedisError from './redis.error-handler';


/**
 * Cache-Aside Pattern: Get or Set Cache.
 * @param key Cache Key.
 * @param fetchData Callback to fetch fresh data if cache miss.
 * @returns Cached or fresh data.
 */
// region Get / Set Cache
export const getOrSetCache = async<T>(key: string, fetchData: () => Promise<T>): Promise<T> => {
    try {
        // ttl Time-to-live in seconds (default: 3600)
        const ttl: number = Number(process.env.REDIS_EXPIRE_TIME) ?? 3600;

        // Attemps to fetch from Redis..
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log(`Cache hit for key: ${key}`);
            return JSON.parse(cachedData) as T;
        }

        console.log(`Cache miss for key: ${key}`);

        // Fetch fresh data and Cache fresh data..
        const freshDataFromPrimaryDB = await fetchData();
        await redisClient.setex(key, ttl, JSON.stringify(freshDataFromPrimaryDB));

        return freshDataFromPrimaryDB;

    } catch (error) {
        handleRedisError(error);
        throw new Error('Failed to fetch from cache or source.');
    }
};


/**
 * Delete Cache Key(s) with or without a pattern.
 * @param param0 
 * @returns Promsie<boolean> or Promise<number> Depending on if it's a single key or pattern.
 */
// region Delete Cache
export const deleteCache = async ({ keys, pattern }: { keys: string | string[], pattern?: string }): Promise<boolean | number> => {
    try {
        if (pattern) {
            // If a pattern is provided, perform pattern-based cache deletion
            return await deleteKeysByPattern(pattern);
        }

        // If Pattern not provided, handle mutiple keys (either array or single key)
        if (Array.isArray(keys)) {
            // Delete Multiple..
            const result = await redisClient.del(...keys);
            return result as number;

        } else {
            // Delete a single key..
            const result = await redisClient.del(keys);
            return result === 1;
        }

    } catch (error) {
        handleRedisError(error);
        throw new Error(`Failed to delete cache for key: ${keys}`);
    }
};

/**
 * Delete keys by Pattern
 * @param pattern 
 * @returns 
 */
// region Delete by Pattern
const deleteKeysByPattern = async (pattern: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        let deletedCount = 0;
        const keysToDelete: string[] = new Array();

        // Create a readable stream for matching keys
        const stream = redisClient.scanStream({
            match: pattern, // Pattern to match keys
        });

        // Listen for the 'data' event to process keys as they are returned by the stream
        stream.on('data', (keys) => {
            if (keys.length > 0) {
                keysToDelete.push(...keys);
            }
        });

        // Handle stream end and perform deletion of all collected keys
        stream.on('end', async () => {
            if (keysToDelete.length > 0) {
                try {
                    // Delete all collected keys in a single operation
                    const result = await redisClient.del(...keysToDelete);
                    deletedCount += result;
                    console.log(`Deleted ${result} keys matching pattern '${pattern}'`);

                } catch (error) {
                    handleRedisError(error);
                    reject(new Error(`Failed to delete cache for pattern: ${pattern}`));
                }
            }

            console.log(`Total keys deleted matching pattern '${pattern}': ${deletedCount}`);
            resolve(deletedCount);
        });

        // Handle Errors in the stream
        stream.on('error', (error) => {
            handleRedisError(error);
            reject(new Error(`Failed to delete cache for pattern: ${pattern}`));
        });
    });
}; 