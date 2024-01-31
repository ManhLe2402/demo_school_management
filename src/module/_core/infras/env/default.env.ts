export const config = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  domain: process.env.DOMAIN,
  // mongoDb: {
  //     type: process.env.DB_TYPE || "mongodb",
  //     synchronize: false,
  //     logging: true,
  //     host: process.env.DB_MONGO_HOST || "127.0.0.1",
  //     port: process.env.DB_MONGO_PORT || 27017,
  //     username: process.env.DB_MONGO_USER || "mapstudy",
  //     password: process.env.DB_MONGO_PASSWORD || "123456",
  //     database: process.env.DB_MONGO_NAME || "mapstudy",
  //     extra: {
  //         connectionLimit: 10
  //     }
  //     // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
  //     // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
  //     // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  // },
  postgresDb: {
    type: process.env.DB_TYPE || "postgresql",
    host: process.env.DB_POSTGRES_HOST || "mapstudy.edu.vn",
    port: process.env.DB_POSTGRES_PORT || 5432,
    username: process.env.DB_POSTGRES_USER || "manhle",
    password: process.env.DB_POSTGRES_PASSWORD || "manhle123",
    database: process.env.DB_POSTGRES_NAME || "mapstudy_train",
    autoGenerate: process.env.AUTO_GENERATE || false,
  },
  // graphql: {
  // debug: true,
  // playground: {
  //     settings: {
  //         "request.credentials": "include"
  //     }
  // },
  // autoSchemaFile: true,
  // autoTransformHttpErrors: true
  // cors: { credentials: true },
  // sortSchema: true,
  // installSubscriptionHandlers: true,
  // },
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtAccessTokenExpiresTime: process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshTokenExpiresTime: process.env.JWT_REFRESH_TOKEN_EXPIRES_TIME,
  s3Endpoint: process.env.AWS_S3_ENPOINT,
  s3AccessKey: process.env.AWS_S3_ACCESS_KEY,
  s3KeySecret: process.env.AWS_S3_KEY_SECRET,
  s3Bucket: process.env.AWS_S3_BUCKET,
  publicFile: `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_S3_ENPOINT}`,
};
