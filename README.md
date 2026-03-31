# Node CLI Quick Start Template

A modern TypeScript-based Node.js CLI project template with best practices for development, testing, and deployment.

## 📋 Features

- **TypeScript** - Full type safety right out of the box
- **Modern Tooling** - pnpm, ESLint, Prettier, tsx
- **Testing** - Mocha + Chai with coverage reporting (c8)
- **Docker** - Multi-stage Docker build with s6-overlay for production
- **CI/CD** - GitHub Actions workflows (CodeQL, CI pipeline)
- **Git Hooks** - Husky with lint-staged for code quality
- **Node 20+** - Modern JavaScript features and performance

## 🚀 Getting Started from Template

If you cloned this as a template, initialize your new project:

```bash
pnpm install
pnpm init
```

This script will:
1. ✅ Reset the Git repository (clean history)
2. ✅ Rename your project
3. ✅ Reset README.md with a fresh template
4. ✅ Update package.json with new metadata
5. ✅ Create an initial commit
6. ✅ Self-delete after completion

### Testing the Initialization Script

Before running the real initialization, you can test it with the `--dry-run` flag:

```bash
# No changes will be made, just a preview
pnpm init -- --dry-run
```

This allows you to see what will happen without actually modifying anything. Run it as many times as needed to verify!

### Running the Real Initialization

Once you're ready to initialize:

```bash
pnpm init
```

Then start developing:

```bash
pnpm dev      # Watch mode development
pnpm build    # Build for production
pnpm test     # Run tests
```

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
