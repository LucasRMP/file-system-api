import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { File, FileTypes } from 'src/resources/files/entities/file.entity';
import { ExistsWithType } from 'src/validators/exists-with-type.rule';

@InputType()
export class CreateFileInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  filename: string;

  @Field()
  @ExistsWithType(File, 'id', FileTypes.FOLDER)
  parentId: string;

  @Field(() => FileTypes)
  type: FileTypes;
}
