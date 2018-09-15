import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const babelConfig = {
  babelrc: false,
  presets: [
    [
      "@babel/env",
      {
        modules: false
      }
    ],
    "@babel/react"
  ]
};

const buildConfig = ({
  format,
  file = "react",
  name = "maskinReact",
  input = "./src/index.js",
  outputDir = "dist",
  transpiled = true,
  minified = false,
  includeExtension = true,
  extension = format,
  sourceMap: sourcemap = minified
}) => {
  const fileName = `${file}${includeExtension ? `.${extension}` : ""}${
    minified ? ".min" : ""
  }.js`;

  const plugins = [];
  if (transpiled) plugins.push(babel(babelConfig));
  if (minified) plugins.push(uglify());

  return {
    input,
    output: {
      name,
      format,
      file: fileName,
      dir: outputDir,
      sourcemap,
      globals: {
        react: "React",
        "@maskin/core": "maskinCore"
      }
    },
    plugins,
    external: ["react", "@maskin/core"]
  };
};

const configs = [
  buildConfig({ format: "amd" }),
  buildConfig({ format: "cjs" }),
  buildConfig({ format: "esm" }),
  buildConfig({ format: "system" }),
  buildConfig({ format: "umd" }),
  buildConfig({ format: "umd", minified: true, includeExtension: false }),
  buildConfig({
    format: "iife",
    minified: true,
    includeExtension: true,
    extension: "browser"
  })
];

export default configs;
