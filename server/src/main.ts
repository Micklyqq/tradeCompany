import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Trade Company Application")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .addTag("TRADECOMP")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  app.enableCors();
  await app.listen(PORT, '0.0.0.0',() => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
