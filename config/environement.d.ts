declare global {
  namespace NodeJS {
    interface ProcessEnv {
      IP: string;
      PORT: string;
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_PORT: number;
      JWT_SECRET: string;
      ADMIN_EMAIL: string;
      ADMIN_PASSWORD: string;
    }
  }
}

export {};
