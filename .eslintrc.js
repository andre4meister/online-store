module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'linebreak-style': 'off',
    'no-unused-vars': ['warn'],
    'no-undef': ['warn'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-empty-pattern': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
