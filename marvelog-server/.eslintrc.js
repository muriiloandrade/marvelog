module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules/', '.eslintrc.js'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'import/no-extraneous-dependencies': ['off'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'error',
    'class-methods-use-this': ['off'],
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/indent': [2, 2],
    'no-plusplus': ['off'],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    "@typescript-eslint/lines-between-class-members": ["error", "always", {
      "exceptAfterSingleLine": true
    }],
    "import/extensions": [
      0, // Off
      {
        ignorePackages: true,
        pattern: {
          ".{js,ts}": "never"
        }
      }
    ]

  },
};
