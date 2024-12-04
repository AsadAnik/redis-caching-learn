/**
 * HANDLE THE REDIS ERRORS
 * @param error 
 */
const handleRedisError = (error: unknown) => {
    if (error instanceof Error) {
        console.error('Redis Operation Error: ', error.message);

    } else {
        console.error('Unknown Redis Error: ', error);
    }
};

export default handleRedisError;