module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'jsx-a11y',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'import',
    'import-helpers',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['absolute'],
          ['module'],
          ['/^(#|~|@)\\//'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      { tsx: 'never', ts: 'never', '': 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{jsx,tsx,js,ts}',
          '**/*.spec.{jsx,tsx,js,ts}',
          '**/utils/tests/**/*.{jsx,js,ts,tsx}',
          '**/__mocks__/**/*.{jsx,jsx,ts,tsx}',
          '**/mocks/**/*.{jsx,jsx,ts,tsx}',
        ],
      },
    ],
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-fragments': ['warn', 'element'],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true },
    ],
    'unicorn/no-null': 'off',
    'react/prop-types': 'off',
    camelcase: 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
  },
};
