#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { rimraf } from 'rimraf';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration - replace with your template repo
const TEMPLATE_REPO = 'https://github.com/YOUR_USERNAME/my-node-cli-quick-start.git';
const TEMPLATE_BRANCH = 'main';

const projectName = process.argv[2];

if (!projectName) {
  console.log('\n❌ Usage: node bootstrap.mjs <project-name>\n');
  console.log('Example:');
  console.log('  node bootstrap.mjs my-awesome-project\n');
  process.exit(1);
}

async function bootstrap() {
  try {
    console.log('\n🚀 Bootstrap Mode: Creating new project from template\n');

    const projectPath = path.resolve(projectName);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
      console.error(`❌ Directory "${projectName}" already exists!\n`);
      process.exit(1);
    }

    // 1. Clone repository
    console.log('1️⃣  Cloning template repository...');
    execSync(
      `git clone --depth 1 --branch ${TEMPLATE_BRANCH} ${TEMPLATE_REPO} "${projectPath}"`,
      { stdio: 'inherit' }
    );
    console.log('   ✅ Repository cloned\n');

    // 2. Install dependencies
    console.log('2️⃣  Installing dependencies...');
    execSync('pnpm install --frozen-lockfile', {
      cwd: projectPath,
      stdio: 'inherit',
    });
    console.log('   ✅ Dependencies installed\n');

    // 3. Remove .git to reset history
    console.log('3️⃣  Resetting Git history...');
    const gitDir = path.join(projectPath, '.git');
    if (fs.existsSync(gitDir)) {
      await rimraf(gitDir);
    }
    execSync('git init', { cwd: projectPath, stdio: 'pipe' });
    execSync('git config user.email "you@example.com"', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    execSync('git config user.name "Your Name"', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    console.log('   ✅ Git history reset\n');

    // 4. Initialize project with new name (non-interactive)
    console.log('4️⃣  Initializing project configuration...');
    const initScriptPath = path.join(projectPath, 'scripts/init-template.mjs');
    execSync(`node "${initScriptPath}" --name=${projectName}`, {
      cwd: projectPath,
      stdio: 'inherit',
    });
    console.log();

    // 5. Remove bootstrap script (this file if it exists in the new project)
    const bootstrapInProject = path.join(projectPath, 'scripts/bootstrap.mjs');
    if (fs.existsSync(bootstrapInProject)) {
      fs.unlinkSync(bootstrapInProject);
    }
    console.log('5️⃣  Cleaning up bootstrap scripts...');
    console.log('   ✅ Cleaned\n');

    console.log('✨ Project created successfully!\n');
    console.log(`📁 Location: ${projectPath}\n`);
    console.log('Quick start:');
    console.log(`  cd ${projectName}`);
    console.log('  pnpm dev\n');
  } catch (error) {
    console.error('\n❌ Bootstrap failed:');
    console.error(error.message);
    process.exit(1);
  }
}

bootstrap();
