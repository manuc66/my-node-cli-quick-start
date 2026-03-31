# 🚀 Quick Start Guide

Choose your preferred method to start a new project from this template.

---

## **Option 1: GitHub Native "Use this template"** 🌟
*Recommended for most users*

### How it works:
1. Click the **"Use this template"** button on GitHub (top-right of repo page)
2. Fill in your project details
3. GitHub creates a new repo with this template
4. Clone your new repo
5. Initialize locally

### Commands:
```bash
# Clone YOUR new repo (not the template)
git clone https://github.com/YOUR_USERNAME/your-new-project.git
cd your-new-project

# Install and initialize
pnpm install
pnpm setup
```

### Visual test before committing:
```bash
# Preview what will happen (can run multiple times)
pnpm setup -- --dry-run

# Actually initialize when ready
pnpm setup
```

**Pros:** 
- ✅ Native GitHub workflow
- ✅ Full control on repo creation
- ✅ Clean new repo (no original history)
- ✅ Ready for CI/CD settings

---

## **Option 2: One-Command Bootstrap** ⚡
*Best for automation and scripting*

### How it works:
1. Run a single command from anywhere
2. Bootstrap creates a new folder with your project name
3. Clones, installs, and initializes automatically
4. No manual steps needed

### Commands:

**If you have this template locally (or cloned it):**
```bash
# Update TEMPLATE_REPO in scripts/bootstrap.mjs first
node scripts/bootstrap.mjs my-awesome-project
cd my-awesome-project
pnpm dev
```

**Cross-platform alternative (git + pnpm):**
```bash
# Works on Windows, macOS, Linux
git clone --depth 1 https://github.com/YOUR_USERNAME/my-node-cli-quick-start.git my-awesome-project
cd my-awesome-project
pnpm install
pnpm setup
```

### What it does automatically:
1. ✅ Creates `./my-awesome-project/` folder
2. ✅ Clones the template repo with shallow history
3. ✅ Installs dependencies
4. ✅ Resets Git (removes original history)
5. ✅ Runs initialization with your project name
6. ✅ Cleans up bootstrap scripts
7. ✅ Project ready to use!

**Pros:**
- ✅ One command, fully automated
- ✅ Perfect for CI/CD integration
- ✅ Fast (shallow clone)
- ✅ No manual interaction

---

## **Option 3: Manual Clone & Initialize** 🛠️
*Best for learning and custom workflows*

### How it works:
1. Clone the template repo directly
2. Follow simple steps to initialize

### Commands:
```bash
# Clone with shallow history only
git clone --depth 1 https://github.com/YOUR_USERNAME/my-node-cli-quick-start.git my-project
cd my-project

# Install dependencies
pnpm install

# Initialize your project
pnpm setup
```

### Optional: Preview first
```bash
# Test without changes (can repeat many times)
pnpm setup -- --dry-run

# When ready, initialize for real
pnpm setup
```

**Pros:**
- ✅ Simple, straightforward steps
- ✅ Full control at each step
- ✅ Easy to understand and debug
- ✅ Good for learning the process

---

## 🎯 Which Option Should I Use?

| Use Case | Option |
|----------|--------|
| **Typical project startup** | Option 1 (GitHub native) |
| **Automated scripts / CI-CD** | Option 2 (Bootstrap) |
| **Learning / Custom workflow** | Option 3 (Manual) |
| **Testing locally** | Option 3 with `--dry-run` |

---

## ⚙️ Setting Up Bootstrap (for your template)

If you're maintaining this template and want Option 2 to work:

1. **Update the template repo URL in `scripts/bootstrap.mjs`:**
   ```javascript
   const TEMPLATE_REPO = 'https://github.com/YOUR_USERNAME/my-node-cli-quick-start.git';
   ```

2. **Test bootstrap locally:**
   ```bash
   node scripts/bootstrap.mjs test-project
   cd test-project
   pnpm dev
   ```

The bootstrap script is cross-platform (Windows, macOS, Linux) and uses Node.js exclusively.

**Note:** The initialization command is `pnpm setup` (not `pnpm init`) to avoid conflict with pnpm's native init command.

---

## 📝 Next Steps After Initialization

Regardless of which option you chose, your project is now ready!

```bash
# Start developing
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Check code quality
pnpm check
```

Edit `.env` for your configuration and start building! 🎉
