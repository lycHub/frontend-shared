import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    name: "@vanilla/default",
    files: ["src/**/*.ts"],
    ignores: ["bac"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        NodeJS: true,
      },
    },
  },
  // 核心规则集
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "@vanilla/strict",
    rules: {
      // TypeScript 强化规则
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/await-thenable": "error",

      // 代码质量规则
      "no-console": "error",
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: "error",
      "default-case": "error",

      // 类型安全增强
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      // 代码风格强化
      "brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "arrow-spacing": "error",
      "block-spacing": "error",
      "comma-dangle": ["error", "never"],
    },
  },

  prettier,
  {
    name: "@vanilla/prettier",
    plugins: { prettier: eslintPluginPrettier },
    rules: { "prettier/prettier": "error" }, // 启用规则
  },
  {
    name: "@vanilla/type-check",
    files: ["src**/*.ts"],
    ignores: ["bac"],
    ...tseslint.configs.disableTypeChecked,
  }
);
