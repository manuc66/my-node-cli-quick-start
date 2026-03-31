# Node CLI Quick Start Template

A modern TypeScript-based Node.js CLI project template with best practices for development, testing, and deployment.

## � Getting Started

👉 **See [QUICKSTART.md](QUICKSTART.md) for 3 different ways to initialize your project!**

Quick overview:
- **Option 1**: Use GitHub's "Use this template" button (recommended)
- **Option 2**: One-command bootstrap from anywhere
- **Option 3**: Manual clone and initialize (for learning)

## �📋 Features

- **TypeScript** - Full type safety right out of the box
- **Modern Tooling** - pnpm, ESLint, Prettier, tsx
- **Testing** - Mocha + Chai with coverage reporting (c8)
- **Docker** - Multi-stage Docker build with s6-overlay for production
- **CI/CD** - GitHub Actions workflows (CodeQL, CI pipeline)
- **Git Hooks** - Husky with lint-staged for code quality
- **Node 20+** - Modern JavaScript features and performance

## 🚀 Getting Started from Template

👉 **[See QUICKSTART.md](QUICKSTART.md) for detailed instructions on 3 different initialization methods**

**Quick reference:**

### Option 1: GitHub Native (Recommended)
```bash
# Use "Use this template" button on GitHub.com
git clone https://github.com/YOUR_USERNAME/your-new-project.git
cd your-new-project
pnpm install
pnpm init
```

### Option 2: One-Command Bootstrap
```bash
node scripts/bootstrap.mjs my-awesome-project
cd my-awesome-project
pnpm dev
```
*(Requires updating TEMPLATE_REPO in bootstrap.mjs first)*

### Option 3: Manual Workflow  
```bash
git clone --depth 1 https://github.com/YOUR_USERNAME/my-node-cli-quick-start.git my-project
cd my-project
pnpm install
pnpm init
```

**Testing before commit (all methods):**
```bash
pnpm init -- --dry-run  # Preview changes (repeatable)
pnpm init               # Actually initialize
```

See [QUICKSTART.md](QUICKSTART.md) for detailed explanations and more options!

## 📁 Project Structure

```
src/                 # TypeScript source files
  ├── index.ts      # Entry point
  ├── cli.ts        # CLI argument parsing
  ├── logger.ts     # Logging utilities
  ├── errors.ts     # Error definitions
  └── ...           # Other utilities

test/                # Test files (Mocha)
scripts/             # Build and maintenance scripts
config/              # Configuration files
.github/workflows/   # GitHub Actions CI/CD

Dockerfile           # Multi-stage production image
```

## 🔧 Development

### Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Watch mode development with tsx |
| `pnpm build` | Build TypeScript to dist/ |
| `pnpm test` | Run Mocha tests |
| `pnpm test:watch` | Watch mode testing |
| `pnpm test:coverage` | Coverage report with c8 |
| `pnpm check` | Lint, type check, format check |
| `pnpm format` | Auto-fix code style |
| `pnpm ci` | Full CI pipeline (check + test + build) |
| `pnpm init` | Re-initialize from template |

### Code Quality

```bash
pnpm check      # ESLint + TypeScript + Prettier
pnpm format     # Auto-fix everything
```

The project enforces:
- ESLint (typescript-eslint)
- Prettier (opinionated formatting)
- TypeScript strict mode
- 80% test coverage minimum

### Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Default variables:
- `LOG_LEVEL` - Logging level (error, warn, info, debug, trace)
- `NODE_ENV` - Environment (development, production, test)
- `SECRET` - Application secrets

## 🐳 Docker

Build and run the container:

```bash
# Build
docker build -t my-cli:latest .

# Run
docker run --rm my-cli:latest your-command
```

The Dockerfile includes:
- Multi-stage build for size optimization
- s6-overlay for proper signal handling
- Health checks
- Non-root user execution

## 🧪 Testing

Run tests with coverage:

```bash
pnpm test:coverage
```

Coverage requirements:
- Lines: 80%
- Functions: 80%
- Branches: 75%

## 📦 Publishing

The project is configured for npm publishing via GitHub Actions.

Ensure:
1. `package.json` has correct `name`, `version`, `description`
2. `files` field includes necessary artifacts (dist, README.md, etc.)
3. GitHub secrets configured for npm token

## 🔄 CI/CD

GitHub Actions workflows:
- **CI Pipeline** - Lint, test, build on every push
- **CodeQL** - Security scanning
- **Release** - Publish to npm (on version tags)

See `.github/workflows/` for configuration.

## 📝 Git Hooks

Pre-commit hooks via Husky:
- Run ESLint on staged files
- Run Prettier on staged TypeScript files

Bypass checks (if needed):
```bash
git commit --no-verify
```

## 📄 License

MIT - See LICENSE file for details

## 🤝 Contributing

1. Follow the code quality standards (`pnpm check`)
2. Add tests for new features
3. Ensure 80%+ coverage
4. Format code (`pnpm format`)

---

**Start building your CLI!** 🎉

## 🛠️ For Template Maintainers

See [TEMPLATE-SETUP.md](TEMPLATE-SETUP.md) for setup instructions and checklist.
