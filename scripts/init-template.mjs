#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { rimraf } from 'rimraf';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const readmeFilePath = path.join(rootDir, 'README.md');
const scriptFilePath = fileURLToPath(import.meta.url);

// Check for --dry-run or --test flag
const isDryRun = process.argv.includes('--dry-run') || process.argv.includes('--test');
const projectNameArg = process.argv.find(arg => arg.startsWith('--name='));
const hasNonInteractiveMode = !!projectNameArg;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

const newReadmeContent = `# ${'{PROJECT_NAME}'}

A Node CLI project built with TypeScript.

## Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Available Scripts

- \`pnpm dev\` - Development mode with watch
- \`pnpm build\` - Build for production
- \`pnpm test\` - Run tests
- \`pnpm test:watch\` - Watch mode testing
- \`pnpm check\` - Lint and type check
- \`pnpm format\` - Auto-format code

## License

MIT
`;

function normalizePackageName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function main() {
  console.log('\n🚀 Template Initialization Script\n');
  if (isDryRun) {
    console.log('🧪 DRY-RUN MODE (no changes will be made)\n');
  }
  if (hasNonInteractiveMode) {
    console.log('🤖 NON-INTERACTIVE MODE\n');
  }
  console.log('This will reinitialize your project from the template.\n');

  // Get project name
  let normalizedName;
  if (hasNonInteractiveMode) {
    normalizedName = normalizePackageName(projectNameArg.split('=')[1]);
  } else {
    const defaultName = 'my-awesome-cli';
    const projectName = await question(
      `Enter your project name (${defaultName}): `
    );
    normalizedName = normalizePackageName(
      projectName || defaultName
    );
  }

  console.log(`\n📦 Project name: ${normalizedName}`);

  // Confirm (skip in non-interactive mode)
  if (!hasNonInteractiveMode) {
    const confirm = await question('\nProceed with initialization? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('❌ Cancelled.');
      rl.close();
      return;
    }
  }

  try {
    console.log('\n⏳ Initializing...\n');

    // 1. Reset Git
    console.log('1️⃣  Resetting Git repository...');
    if (!isDryRun) {
      const gitDir = path.join(rootDir, '.git');
      if (fs.existsSync(gitDir)) {
        await rimraf(gitDir);
      }
      execSync('git init', { cwd: rootDir, stdio: 'pipe' });
      execSync('git config user.email "you@example.com"', {
        cwd: rootDir,
        stdio: 'pipe',
      });
      execSync('git config user.name "Your Name"', {
        cwd: rootDir,
        stdio: 'pipe',
      });
    }
    console.log('   ✅ Git reset\n');

    // 2. Update package.json
    console.log('2️⃣  Updating package.json...');
    if (!isDryRun) {
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, 'utf-8')
      );
      packageJson.name = normalizedName;
      packageJson.version = '0.0.1';
      packageJson.description = `${normalizedName} - Node CLI project`;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n'
      );
    }
    console.log('   ✅ package.json updated\n');

    // 3. Reset README.md
    console.log('3️⃣  Reset README.md...');
    if (!isDryRun) {
      const readmeContent = newReadmeContent.replace(
        '{PROJECT_NAME}',
        normalizedName
      );
      fs.writeFileSync(readmeFilePath, readmeContent);
    }
    console.log('   ✅ README.md reset\n');

    // 4. Create initial commit
    console.log('4️⃣  Creating initial commit...');
    if (!isDryRun) {
      execSync('git add .', { cwd: rootDir, stdio: 'pipe' });
      execSync('git commit -m "Initial commit from template"', {
        cwd: rootDir,
        stdio: 'pipe',
      });
    }
    console.log('   ✅ Initial commit created\n');

    // 5. Remove this script (only if not dry-run)
    if (!isDryRun) {
      console.log('5️⃣  Cleaning up initialization script...');
      fs.unlinkSync(scriptFilePath);
      console.log('   ✅ Script removed\n');
    } else {
      console.log('5️⃣  Initialization script cleanup (skipped in dry-run)\n');
    }

    if (isDryRun) {
      console.log('✨ Dry-run complete! No changes were made.\n');
      console.log('Run without --dry-run to apply changes:\n');
      console.log('  pnpm setup\n');
    } else {
      console.log('✨ Initialization complete!\n');
      console.log(`Your new project "${normalizedName}" is ready to use.`);
      console.log('Next steps:');
      console.log('  1. Update .env.example with your configuration');
      console.log('  2. Run: pnpm install');
      console.log('  3. Run: pnpm dev\n');
    }
  } catch (error) {
    console.error('❌ Error during initialization:');
    console.error(error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
