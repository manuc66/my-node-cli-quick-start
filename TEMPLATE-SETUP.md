# 🏗️ Maintaining This Template

If you're using this as a template repository and want to enable all 3 initialization methods, here's what you need to do.

## Step 1: Add Repository URL

Update `scripts/bootstrap.mjs` with your GitHub repository URL:

```javascript
const TEMPLATE_REPO = 'https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git';
```

Example:
```javascript
const TEMPLATE_REPO = 'https://github.com/john-doe/awesome-cli-template.git';
```

## Step 2: Configure GitHub Template Settings

1. Go to your GitHub repo settings
2. Scroll to "Template repository" section
3. ✅ Check **"Template repository"**
4. Save

This enables the **"Use this template"** button (Option 1).

## Step 3: Enable Branch Protection (Optional)

To prevent accidental changes to the main branch:

1. Go to repository settings → Branches
2. Add branch protection rule for `main`
3. Require PR reviews before merge
4. Require status checks to pass (CI)

## Step 4: Update CI/CD References (Optional)

If your GitHub Actions reference specific branch/repo names, update:
- `.github/workflows/ci.yml` 
- Any hardcoded repo references

## Step 5: Test All 3 Methods

### Test Option 1 (GitHub Native)
```bash
# On GitHub.com: Click "Use this template" 
# → Create a test repo
# → Clone and verify it works
```

### Test Option 2 (Bootstrap)
```bash
# From this repo directory
node scripts/bootstrap.mjs test-project
cd test-project
pnpm dev
# Verify it works, then delete test-project
```

### Test Option 3 (Manual)
```bash
git clone --depth 1 https://github.com/YOUR_USERNAME/YOUR_REPO.git test-manual
cd test-manual
pnpm install
pnpm init
# Verify it works, then delete test-manual
```

## Step 6: Document in Your README

Make sure users know about all 3 options. The template already includes [QUICKSTART.md](QUICKSTART.md) which covers this.

## 🔄 Updating the Template

When you improve the template, remember:

1. ✅ Update source files (`src/`, `test/`, etc.)
2. ✅ Run `pnpm ci` to ensure everything still works
3. ✅ Test initialization with `pnpm init -- --dry-run`
4. ✅ Commit to main branch
5. Make sure users who bootstrap after will get the new features

## 📝 Template Maintenance Checklist

- [ ] Repository marked as "Template repository" on GitHub
- [ ] `scripts/bootstrap.mjs` has correct TEMPLATE_REPO URL
- [ ] `QUICKSTART.md` is up-to-date
- [ ] `README.md` links to QUICKSTART.md
- [ ] CI/CD workflows work on new clone
- [ ] `pnpm init` works in all modes (interactive, --dry-run, --name=)
- [ ] `pnpm bootstrap` creates working projects
- [ ] Git history properly reset after initialization
- [ ] README gets reset to fresh template
- [ ] package.json name/version get updated

## 🐛 Troubleshooting

**Bootstrap fails to clone:**
- Check TEMPLATE_REPO URL in `bootstrap.mjs`
- Ensure repo is public (or provide auth)

**`pnpm init` hangs:**
- It might be waiting for user input if not using proper flags
- Use `--name=projectname` for non-interactive mode

**Scripts not found after init:**
- `init-template.mjs` and `bootstrap.mjs` should be auto-deleted
- They're only for setting up from the template

---

Happy templating! 🚀
