import { Storage } from '../interface/upload.interface';
import StorageModel from '../../src/models/upload';

/**
 * The function `registerUpload` creates a new storage item with the provided file name, user ID, and
 * path, and returns the created item or 'ITEM_NOT_FOUND' if it fails.
 * @param {Storage}  - - `fileName`: The name of the file being uploaded.
 * @returns The function `registerUpload` returns either the created `responseItem` object or the
 * string `'ITEM_NOT_FOUND'` if `responseItem` is falsy.
 */
const registerUpload = async ({ fileName, idUser, path }: Storage) => {
  const responseItem = await StorageModel.create({ fileName, idUser, path });
  if (!responseItem) return 'ITEM_NOT_FOUND';
  return responseItem;
};

export { registerUpload };
