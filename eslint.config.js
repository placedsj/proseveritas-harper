import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
          ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react,
    },
    rules: {
       "react/jsx-uses-react": "off",
       "react/react-in-jsx-scope": "off",
       "@typescript-eslint/no-explicit-any": "warn",
       "@typescript-eslint/no-unused-vars": "warn"
    },
     settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
