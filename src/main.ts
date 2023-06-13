import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import basicAuth, { IBasicAuthedRequest } from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import env from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(bodyParser.json());

  const getUnauthorizedResponse = (req: IBasicAuthedRequest): string => {
    return req.auth
      ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
      : 'No credentials provided';
  };

  const config = new DocumentBuilder()
    .setTitle('BeerTech BookStore API')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Token',
      },
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/api/doc',
    basicAuth({
      challenge: true,
      users: { [env().swaggerUsername]: env().swaggerPassword },
      unauthorizedResponse: getUnauthorizedResponse,
    }),
  );

  SwaggerModule.setup('/api/doc', app, document);

  const port = env().PORT || 3007;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
