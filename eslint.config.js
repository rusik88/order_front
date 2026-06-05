import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    files: ["**/*.{js,ts,jsx,tsx}"],

    plugins: {
      import: importPlugin,
    },

    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-unexpected-multiline": "error",

      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // "@typescript-eslint/consistent-type-imports": "warn",
    },

    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
    ],
  },
]);