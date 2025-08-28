# Files to Add to Your GitHub Repository

## 1. Add netlify.toml file

**Location:** Root of your repository (same level as package.json)
**Filename:** `netlify.toml`

### What to do:
1. Go to your GitHub repository
2. Click "Create new file"
3. Name it: `netlify.toml`
4. Paste this content:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### What this does:
- **publish = "dist"**: Tells Netlify to serve files from the `dist` folder (where Vite builds your app)
- **command = "npm run build"**: Tells Netlify how to build your project
- **NODE_VERSION = "18"**: Ensures Netlify uses Node.js version 18
- **redirects**: Makes your React Router work properly (all routes go to index.html)

---

## 2. Update package.json scripts section

**Location:** Root of your repository
**Filename:** `package.json` (this file already exists)

### What to do:
1. Go to your GitHub repository
2. Click on `package.json` to view it
3. Click the pencil icon (Edit this file)
4. Find the `"scripts"` section
5. Replace it with this:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:ci": "npm ci && npm run build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Current vs Updated:

**BEFORE (what you probably have now):**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

**AFTER (what you need):**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:ci": "npm ci && npm run build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### What changed:
- **Added:** `"build:ci": "npm ci && npm run build"`
- This provides a reliable build command for CI/CD environments

---

## 3. File Structure After Changes

Your GitHub repository should look like this:

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← NEW FILE
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── netlify.toml                ← NEW FILE
├── package.json                ← UPDATED FILE
├── README.md
└── ... (other existing files)
```

---

## 4. Step-by-Step GitHub Instructions

### Step 1: Add netlify.toml
1. Go to your GitHub repo
2. Click "Create new file"
3. Type filename: `netlify.toml`
4. Paste the netlify.toml content above
5. Scroll down, add commit message: "Add Netlify configuration"
6. Click "Commit new file"

### Step 2: Update package.json
1. In your GitHub repo, click on `package.json`
2. Click the pencil icon (Edit this file)
3. Find the `"scripts"` section
4. Add the `"build:ci"` line as shown above
5. Scroll down, add commit message: "Update build scripts for CI/CD"
6. Click "Commit changes"

### Step 3: Add GitHub Actions workflow
1. Click "Create new file"
2. Type path: `.github/workflows/deploy.yml`
3. Paste the workflow content from the previous instructions
4. Commit with message: "Add GitHub Actions workflow"

---

## 5. After Adding These Files

Once you've added all three files to GitHub:

1. **Clone the repository locally:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install
   npm run dev
   ```

2. **Configure Netlify secrets** in GitHub:
   - Go to repo Settings → Secrets and variables → Actions
   - Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`

3. **Test the workflow:**
   - Make any small change and push
   - Check Actions tab to see if it runs

Any questions about these specific steps?