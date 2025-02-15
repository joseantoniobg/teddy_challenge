import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { DatabasePostgresConfig } from './shared/database/dababase.postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabasePostgresConfig }),
    ClientsModule,
  ],
})
export class AppModule {}