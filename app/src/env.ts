export type Env = {
  cookieSecret: string;
  mongo: {
    endpoint: string;
    dbName: string;
  };
};

export function defineEnv(e: Env) {
  return e;
}

export const env = defineEnv({
  cookieSecret: process.env.COOKIE_SECRET as string,
  mongo: {
    endpoint: process.env.MONGO_ENDPOINT as string,
    dbName: process.env.MONGO_DB_NAME as string,
  },
});
