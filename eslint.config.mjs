// @ts-check
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default defineConfig(
  globalIgnores(["dist/", ".astro/"]),
  // Non-type-aware TypeScript linting: no `parserOptions.project` /
  // `projectService`, so this does not require type information.
  tseslint.configs.recommended,
  eslintPluginAstro.configs["flat/recommended"],
);
