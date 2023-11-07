export type Env = {
  cookieSecret: string;
  mongo: {
    dbName: string;
    endpoint: string;
  };
};

export function defineEnv(e: Env) {
  return e;
}

export const env = defineEnv({
  cookieSecret: process.env.COOKIE_SECRET as string,
  mongo: {
    dbName: process.env.MONGO_DB_NAME as string,
    endpoint: process.env.MONGO_ENDPOINT as string,
  },
});
