declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DIALECT:
      | 'mysql'
      | 'postgres'
      | 'sqlite'
      | 'mariadb'
      | 'mssql'
      | 'db2'
      | 'snowflake'
      | 'oracle';
    DATABASE_STORAGE: string;
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    SEEDING: 'true' | 'false';
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    MINIO_ENDPOINT: string;
    MINIO_PORT: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    MINIO_BUCKET: string;
    MINIO_USE_SSL: 'true' | 'false';
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
    MAIL_FROM_NAME: string;
    MAIL_FROM_ADDRESS: string;
  }
}
