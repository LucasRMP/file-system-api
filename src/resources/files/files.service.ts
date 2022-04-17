import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';

import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(createFileInput: CreateFileInput) {
    const parent = await this.fileRepository.findOne(createFileInput.parentId);
    const file = this.fileRepository.create({ ...createFileInput, parent });
    return this.fileRepository.save(file);
  }

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: string) {
    return this.fileRepository.findOne(id);
  }

  findAllByPath(path: string) {
    const parsedPath = path.endsWith('/') ? path : `${path}/`;

    const absolutePathPattern = `${parsedPath}_%`;
    return this.fileRepository
      .createQueryBuilder('file')
      .where(`file.absolutePath like :absolutePathPattern`, {
        absolutePathPattern,
      })
      .andWhere(`file.absolutePath not like :absolutePathPatternExtended`, {
        absolutePathPatternExtended: `${absolutePathPattern}/_%`,
      })
      .getMany();
  }

  update(id: number, updateFileInput: UpdateFileInput) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
