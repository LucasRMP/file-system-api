import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { IGraphQLContext } from 'src/@types/graphql';
import { FindByFolderInput } from 'src/resources/files/dto/find-by-path.input';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.filesService.findAll();
  }

  @Query(() => [File], { name: 'filesByFolder' })
  async findByFolder(@Args('input') input: FindByFolderInput): Promise<File[]> {
    return this.filesService.findAllByPath(input.path);
  }

  @Mutation(() => File)
  createFile(@Args('input') input: CreateFileInput) {
    return this.filesService.create(input);
  }

  @Mutation(() => File)
  updateFile(@Args('input') input: UpdateFileInput) {
    return this.filesService.update(input.id, input);
  }

  @ResolveField()
  async parent(
    @Parent() file: File,
    @Context() { filesByIdLoader }: IGraphQLContext,
  ) {
    const { parentId } = file;
    if (!parentId) return null;
    return filesByIdLoader.load(parentId);
  }
}
