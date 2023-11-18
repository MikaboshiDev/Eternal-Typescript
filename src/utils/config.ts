import YAML from 'yaml';
import fs from 'fs';

export const config = YAML.parse(fs.readFileSync('./config/config.yml', 'utf8'));
