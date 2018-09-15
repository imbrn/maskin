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
    ]
  ]
};

const buildConfig = ({
  format,
  file = "core",
  name = "maskinCore",
  input = "./index.js",
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
      sourcemap
    },
    plugins
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
    includeExtension: false,
    extension: "browser"
  })
];

export default configs;
