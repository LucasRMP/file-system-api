import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesResolver, FilesService],
})
export class FilesModule {}
