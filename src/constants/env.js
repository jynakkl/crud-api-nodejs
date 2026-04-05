const getEnv = (key) => {
    const value = process.env[key];

    if(value === undefined) {
        throw new Error("Error loading .env file");
    }

    return value;
}

export const PORT = getEnv("PORT") || 3000;
export const MONGO_URI = getEnv("MONGO_URI");
export const NODE_ENV = getEnv("NODE_ENV");
export const APP_ORIGIN = getEnv("APP_ORIGIN");