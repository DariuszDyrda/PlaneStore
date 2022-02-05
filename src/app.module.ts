import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PlaneModule } from './plane/plane.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    AuthModule,
    AdminModule,
    PlaneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
