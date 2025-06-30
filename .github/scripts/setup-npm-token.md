# Setting up NPM_TOKEN for GitHub Actions

This guide will help you set up the NPM_TOKEN secret required for publishing the AutoAgent package to npm.

## Prerequisites

1. An npm account at [npmjs.com](https://www.npmjs.com)
2. Write access to the GitHub repository

## Steps

### 1. Generate npm Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Click on your profile picture → Access Tokens
3. Click "Generate New Token"
4. Select "Classic Token"
5. Choose type: **Automation**
   - This type is specifically for CI/CD workflows
6. Give it a descriptive name like "autoagent-github-actions"
7. Click "Generate Token"
8. **Copy the token immediately** (it won't be shown again)

### 2. Add Token to GitHub Repository

1. Go to your GitHub repository
2. Navigate to: Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: Paste the token you copied from npm
5. Click "Add secret"

### 3. Verify Setup

To verify the token is working:

1. Go to the Actions tab in your repository
2. Run the "Release Package" workflow manually:
   - Click on "Release Package"
   - Click "Run workflow"
   - Select branch and click "Run workflow"
3. The workflow will skip if no version change is detected

## Security Best Practices

1. **Never commit tokens** to the repository
2. **Use Automation tokens** for CI/CD (not Publish tokens)
3. **Rotate tokens regularly** (every 90 days recommended)
4. **Limit token scope** if your npm organization supports it
5. **Monitor token usage** in npm's access log

## Troubleshooting

### Token not working

1. Verify the token type is "Automation"
2. Check token hasn't expired
3. Ensure secret name is exactly `NPM_TOKEN`
4. Verify you have publish rights to the package

### Permission denied errors

1. Check your npm account has publish access
2. For scoped packages, ensure organization access
3. Verify 2FA settings match token type

### Rate limiting

npm has rate limits for publishing:
- Wait a few minutes between publish attempts
- Don't publish the same version twice

## Alternative: Using GITHUB_TOKEN

For publishing to GitHub Packages instead of npm:

1. No additional setup needed
2. Change registry in `.npmrc`:
   ```
   @carlrannaberg:registry=https://npm.pkg.github.com
   ```
3. Update workflow to use `GITHUB_TOKEN`

## Resources

- [npm Docs: Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [GitHub Docs: Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [npm Docs: About authentication tokens](https://docs.npmjs.com/about-authentication-tokens)