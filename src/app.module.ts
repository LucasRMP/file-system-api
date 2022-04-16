import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PosgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { UsersCodeFirstModule } from './models/users-code-first/users-code-first.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(join(process.cwd(), 'src/schema.gql')),
    }),
    PosgresDatabaseProviderModule,
    UsersCodeFirstModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
