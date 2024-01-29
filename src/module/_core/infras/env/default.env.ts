export const config = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  postgresDb: {
    type: process.env.DB_POSTGRES_TYPE || "postgresql",
    host: process.env.DB_POSTGRES_HOST || "mapstudy.edu.vn",
    port: process.env.PORT || 5432,
    username: process.env.DB_POSTGRES_USER || "manhle",
    password: process.env.DB_POSTGRES_PASSWORD || "manhle123",
    database: process.env.DB_POSTGRES_NAME || "mapstudy_train",
    schema: process.env.DB_POSTGRES_SCHEMA || "school_management",
    extra: {
      connectionLimit: 10,
    },
  },
};
