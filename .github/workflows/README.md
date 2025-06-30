# GitHub Actions Workflows

This directory contains the CI/CD workflows for the AutoAgent project.

## Workflows

### 1. Test and Lint (`test.yaml`)
**Trigger**: On push to main/master and on pull requests
**Purpose**: Runs tests, linting, and security checks

- Runs tests on Node.js 14, 16, and 18
- Executes ESLint for code quality
- Generates code coverage reports
- Checks version changes in PRs
- Performs security vulnerability scanning

### 2. Release Package (`release.yaml`)
**Trigger**: On push to main/master or manual workflow dispatch
**Purpose**: Publishes the package to npm

- Validates version hasn't been published
- Builds and validates the package
- Creates git tags
- Publishes to npm (requires NPM_TOKEN secret)
- Creates GitHub releases

### 3. Dependency Review (`dependency-review.yaml`)
**Trigger**: On PRs that modify package.json or package-lock.json
**Purpose**: Reviews dependency changes for security and licensing

- Checks for high-severity vulnerabilities
- Validates license compatibility
- Monitors bundle size impact

### 4. Version Bump (`version-bump.yaml`)
**Trigger**: Manual workflow dispatch
**Purpose**: Automates version bumping

- Supports patch, minor, major, and prerelease bumps
- Creates a PR with the version change
- Follows semantic versioning

### 5. Scheduled Checks (`scheduled-checks.yaml`)
**Trigger**: Weekly (Mondays at 9 AM UTC) or manual
**Purpose**: Regular maintenance checks

- Checks for outdated dependencies
- Runs security audits
- Validates documentation links
- Monitors package size

## Required Secrets

### NPM_TOKEN
Required for publishing to npm. To set up:

1. Go to [npmjs.com](https://www.npmjs.com)
2. Login to your account
3. Go to Access Tokens
4. Create a new token with "Automation" type
5. Add to GitHub repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token

## Usage

### Running Tests Locally
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

### Publishing a Release
1. Update version in package.json
2. Commit and push to main/master
3. The release workflow will automatically:
   - Run tests
   - Build the package
   - Create a git tag
   - Publish to npm
   - Create a GitHub release

### Manual Version Bump
1. Go to Actions tab
2. Select "Version Bump" workflow
3. Click "Run workflow"
4. Select version type (patch/minor/major/prerelease)
5. A PR will be created with the version change

## Best Practices

1. **Always update version** before merging PRs with changes
2. **Review security alerts** from dependency scans
3. **Monitor package size** to stay under 15KB gzipped
4. **Keep dependencies updated** but test thoroughly
5. **Use semantic versioning** for all releases

## Troubleshooting

### Tests failing on CI but passing locally
- Check Node.js version matches CI (14, 16, or 18)
- Ensure all dependencies are in package.json
- Verify no OS-specific code

### Release workflow not publishing
- Check NPM_TOKEN is set correctly
- Verify version hasn't been published already
- Ensure all tests pass

### Version check failing
- Make sure to update version in package.json
- Use valid semantic version format (e.g., 1.2.3)