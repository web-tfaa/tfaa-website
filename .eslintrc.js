{
  extends: [
    // 'airbnb'
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [
      error,
      { extensions: ['.js', '.jsx'] }
    ],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 1,
    'react/no-did-mount-set-state': 0,
    'react/prefer-stateless-function': 1,
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/jsx-uses-vars': [2],
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'comma-dangle': 1,
    'no-shadow': 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
    'no-console': 0,
    'no-case-declarations': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-props-no-spreading': 0
  },
  settings: {
    // 'import/core-modules': ['react', 'prop-types']
    react: {
      version: 'detect'
    },
  },
  globals: {
    graphql: true
  },
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
}
