# GitHub Repository Setup Instructions

## Files to Add to Your GitHub Repository

### 1. GitHub Actions Workflow
**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v3.0
      with:
        publish-dir: './dist'
        production-branch: master
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
        enable-pull-request-comment: false
        enable-commit-comment: true
        overwrites-pull-request-comment: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      timeout-minutes: 10
```

### 2. Netlify Configuration
**File:** `netlify.toml`

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

### 3. Updated Package.json Scripts
**Update your existing `package.json`** to include these scripts:

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

## Step-by-Step GitHub Setup

### Step 1: Add Workflow File
1. Go to your GitHub repository
2. Click "Create new file"
3. Type path: `.github/workflows/deploy.yml`
4. Paste the workflow content above
5. Commit with message: "Add GitHub Actions workflow"

### Step 2: Add Netlify Config
1. Create new file: `netlify.toml`
2. Paste the netlify config content above
3. Commit with message: "Add Netlify configuration"

### Step 3: Update Package.json
1. Edit your existing `package.json`
2. Update the scripts section as shown above
3. Commit with message: "Update build scripts"

### Step 4: Configure Secrets
1. Go to Repository Settings
2. Secrets and variables → Actions
3. Add Repository secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

### Step 5: Test
1. Make any small change (edit README, etc.)
2. Commit and push
3. Check Actions tab - should see workflow running
4. Once complete, check your Netlify site

## Getting Netlify Credentials

### Netlify Auth Token:
1. Go to Netlify → User settings → Personal access tokens
2. Generate new token
3. Copy and add as `NETLIFY_AUTH_TOKEN` secret

### Netlify Site ID:
1. Go to your Netlify site dashboard
2. Site settings → General → Site details
3. Copy "Site ID"
4. Add as `NETLIFY_SITE_ID` secret

## After Setup
Once these files are in your GitHub repo:
1. Clone the repository locally: `git clone [your-repo-url]`
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Any push to master will auto-deploy to Netlify!