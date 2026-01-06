import vuePlugin from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import babelParser from '@babel/eslint-parser'
import vueParser from 'vue-eslint-parser'
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/require-explicit-emits': 'warn',
      'vue/no-deprecated-events-api': 'warn',
      'vue/no-deprecated-delete-set': 'warn',
      'vue/no-template-shadow': 'warn',
      'vue/order-in-components': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'public/', '.vscode/', '.idea/', '*.log'],
  },
]
