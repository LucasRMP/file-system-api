import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ExistsWithType } from 'src/validators/exists-with-type.rule';
import { File, FileTypes } from 'src/resources/files/entities/file.entity';
import { IsValidPath } from 'src/validators/valid-path.rule';

@InputType()
export class FindByFolderInput {
  @Field()
  @IsNotEmpty()
  @IsValidPath()
  @ExistsWithType(File, 'absolutePath', FileTypes.FOLDER)
  path: string;
}
