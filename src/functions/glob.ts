import { glob } from 'glob';
import path from 'node:path';
import { logWithLabel } from '../utils/console';

async function deleteCachedFile(file: string) {
  const filePath = path.resolve(file);
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

async function loadFiles(dirName: string) {
  try {
    const files = await glob(path.join(process.cwd(), dirName, '**/*.ts').replace(/\\/g, '/'));
    const jsFiles = files.filter((file) => path.extname(file) === '.ts');
    await Promise.all(jsFiles.map(deleteCachedFile));
    return jsFiles;
  } catch (error) {
    logWithLabel('discord', `Error loading files: ${error}`);
    throw error;
  }
}

export { loadFiles };
