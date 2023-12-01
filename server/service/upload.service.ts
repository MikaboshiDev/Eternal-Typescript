import { Storage } from '../../global';
import StorageModel from '../../src/models/upload';

const registerUpload = async ({ fileName, idUser, path }: Storage) => {
  const responseItem = await StorageModel.create({ fileName, idUser, path });
  if (!responseItem) return 'ITEM_NOT_FOUND';
  return responseItem;
};

export { registerUpload };
