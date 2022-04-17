import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  BeforeInsert,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import slugify from 'slugify';

export enum FileTypes {
  FILE = 'file',
  FOLDER = 'folder',
}

registerEnumType(FileTypes, {
  name: 'FileType',
});

@ObjectType()
@Entity('files')
export class File {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { nullable: false, length: 255 })
  filename: string;

  @Field()
  @Column('varchar', { nullable: false, name: 'absolute_path', unique: true })
  absolutePath: string;

  @Field()
  @Column({
    type: 'enum',
    enum: FileTypes,
    default: FileTypes.FILE,
  })
  type: FileTypes;

  @Column()
  parentId: string;

  @Field(() => File, { nullable: true })
  @ManyToOne(() => File, { onDelete: 'CASCADE' })
  parent: File;

  @BeforeInsert()
  beforeInsertActions() {
    this.generateId();
    this.normalizeFilename();
    this.buildAbsolutePath();
  }

  generateId() {
    this.id = uuid();
  }

  normalizeFilename() {
    this.filename = slugify(this.filename);
  }

  buildAbsolutePath() {
    const divider = this.parent.absolutePath.endsWith('/') ? '' : '/';
    this.absolutePath = `${this.parent.absolutePath}${divider}${this.filename}`;
  }
}
