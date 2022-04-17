import DataLoader from 'dataloader';
import { File } from 'src/resources/files/entities/file.entity';

export interface IGraphQLContext {
  filesByIdLoader: DataLoader<string, File>;
}
