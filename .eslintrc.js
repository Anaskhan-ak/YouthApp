module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    'no-undef': 'error', // ❗️ Show red line for undefined variables/components
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react/no-unstable-nested-components': 'off',
  },
};
