module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  env: {
    node: true,
    es2020: true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }]
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '!.eslintrc.js',
    'coverage/'
  ],
  overrides: [
    {
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['src/utils/logger.ts', 'src/core/config-manager.ts'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['test/benchmarks/**/*.ts'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
};