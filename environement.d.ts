declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_PORT: number;
    }
  }
}

export {};
