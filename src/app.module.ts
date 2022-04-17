import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { createFilesByIdLoader } from 'src/resources/files/loaders/file-by-id.loader';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { FilesModule } from './resources/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(join(process.cwd(), 'src/schema.gql')),
      context: () => ({
        filesByIdLoader: createFilesByIdLoader(),
      }),
    }),
    PostgresDatabaseProviderModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
