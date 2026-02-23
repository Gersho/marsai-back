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
      SCALEWAY_ACCESS_KEY: string;
      SCALEWAY_SECRET_KEY: string;
      SCALEWAY_ENDPOINT: string;
      SCALEWAY_BUCKET_NAME: string;
      SCALEWAY_REGION: string;
      SCALEWAY_FOLDER: string;
    }
  }
}

export {};
