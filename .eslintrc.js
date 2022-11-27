module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'react-app',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': [
      0,
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-case-declarations': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'react/forbid-prop-types': 1,
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-vars': [2],
    'react/no-did-mount-set-state': 0,
    'react/prefer-stateless-function': 1,
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
  },
  settings: {
    // 'import/core-modules': ['react', 'prop-types']
    react: {
      version: 'detect'
    }
  },
  globals: {
    __PATH_PREFIX__: true,
    graphql: true,
  },
  overrides: [
    {
      files: ['*test.js', '*.spec.js'],
      rules: {
        'no-undef': 0,
      },
    },
  ],
  plugins: [
    '@typescript-eslint',
    'typescript',
    'react',
    'react-hooks',
  ],
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
};
