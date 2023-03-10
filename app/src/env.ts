export type Env = {
  cookieSecret: string;
};

export function defineEnv(e: Env) {
  return e;
}

export const env = defineEnv({
  cookieSecret: process.env.COOKIE_SECRET as string,
});
