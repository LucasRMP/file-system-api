import * as Dataloader from 'dataloader';
import { getConnection, In } from 'typeorm';

import { File } from '../entities/file.entity';

const findBatchedFiles = async (ids: string[]) => {
  const conn = getConnection('default');
  const filesRepository = conn.getRepository(File);
  return filesRepository.find({ where: { id: In(ids) } });
};

export function createFilesByIdLoader() {
  return new Dataloader<string, File>(findBatchedFiles);
}
