module.exports = {
    env: {
      browser: true, // Enable browser global variables
      es2021: true, // Support for ES2021 syntax
      node: true, // Enable Node.js global variables
    },
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2021, // Latest ECMAScript version
      sourceType: 'module', // Enable ES modules
      ecmaFeatures: {
        jsx: true, // Enable JSX for React
      },
    },
    plugins: [
      '@typescript-eslint', // Add TypeScript plugin
      'react', // Add React plugin
    ],
    extends: [
      'eslint:recommended', // Basic ESLint recommended rules
      'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
      'plugin:react/recommended', // React recommended rules
    ],
    rules: {
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Ignore unused function arguments starting with "_"
          varsIgnorePattern: '^_', // Ignore unused variables starting with "_"
        },
      ],
      'no-unused-vars': 'off', // Disable base rule for unused variables
    //   '@typescript-eslint/no-explicit-any': 'off', // Disable "no-explicit-any" rule
      'react/react-in-jsx-scope': 'off', // Not required for React 17+
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  };
  