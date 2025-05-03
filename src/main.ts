import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!configService.isProduction()) {
    console.log('Swagger is enabled');
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Item API')
        .setDescription('My Item API')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }
  // if (configService.runMigrations()) {
  //   console.log('Running migrations');
  //   const dataSource = new DataSource(configService.getDataSourceOptions());
  //   console.log('DB OPTIONS', configService.getDataSourceOptions()); // 👈 buraya ekle
  //   await dataSource.initialize();
  //   await dataSource.runMigrations();
  // }
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
