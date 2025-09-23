import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { writeFileSync } from "fs";
import {stringify} from "yaml";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Todos')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    console.log(stringify(documentFactory()))
    writeFileSync('openapi.yaml', stringify(documentFactory()), { encoding: 'utf-8' })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
