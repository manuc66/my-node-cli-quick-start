import fs from 'fs';
import path from 'path';

const distFile = path.join(process.cwd(), 'dist', 'index.js');

if (!fs.existsSync(distFile)) {
  console.error('Build validation failed: dist/index.js not found');
  process.exit(1);
}

console.log('Build validation passed');
