module.exports = {
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:tailwind/recommended',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'plugin:jest/recommended',
  ],
  plugins: ['tailwind', 'react', 'jsx-a11y', '@typescript-eslint', 'prettier', 'react-hooks', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  rules: {
    'jsx-a11y/anchor-is-valid': [1],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'table'] }],
    '@typescript-eslint/ban-ts-comment': 1,
    'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: false, printWidth: 120, parser: 'babel-ts' }],
    'import/no-anonymous-default-export': 'off',
    'rest-spread-spacing': 'warn',
    'prefer-rest-params': 'warn',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      // enable eslint-plugin-testing-library rules or preset only for matching files!
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test|jest).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': ['off', { devDependencies: ['**/?(*.)+(spec|test|jest).[jt]s?(x)'] }],
      },
    },
  ],
  ignorePatterns: ['node_modules', 'public', 'styles', '.next', 'coverage', 'dist', '.turbo'],
};
