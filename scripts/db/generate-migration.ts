import { execSync } from 'node:child_process';

const migrationName = process.argv[2];

if (!migrationName) throw new Error('Migration name required');

execSync(
  `typeorm-ts-node-commonjs migration:generate -d src/database/data-source.ts src/database/migrations/${migrationName}`,
  { stdio: 'inherit' },
);
