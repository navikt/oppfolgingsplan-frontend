import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const config = [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
    ],
  },
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
  ),
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
  {
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
  },
];

export default config;
