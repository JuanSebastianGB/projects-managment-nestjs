declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    FRONTEND_URL: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    SALT_ROUNDS: number;
    JWT_SECRET: string;
  }
}
