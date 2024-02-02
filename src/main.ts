import { NestFactory } from "@nestjs/core";
import { AppModule } from "./root/app.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { ValidationPipe } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import * as dotenv from "dotenv";
import { config } from "./module/_core/infras/env/default.env";
import { FormatResponseInterceptor } from "./module/_core/app/middleware/interceptor/formatResponse";

async function bootstrap() {
  const { port } = config;
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  const updateDump = await app
    .get(MikroORM)
    .getSchemaGenerator()
    .getUpdateSchemaSQL({
      wrap: false,
      safe: true,
    });
  console.log("\n\nSTART UPDATE \n\n", updateDump, "\n\nEND UPDATE\n\n");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  await app.listen(port, () => console.log(`App run in ${port}`));
}
bootstrap();
