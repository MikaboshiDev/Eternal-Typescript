import { logWithLabel } from '../../utils/console';
import path from 'node:path';
import { glob } from 'glob';
import chalk from 'chalk';

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
    logWithLabel("discord", `Error loading files: ${chalk.red(error)}`);
    throw error;
  }
}

export { loadFiles };
