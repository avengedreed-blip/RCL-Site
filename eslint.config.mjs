import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "vendor/**", "work/**"],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
