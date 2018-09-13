module.exports = require("babel-jest").createTransformer({
  presets: ["@babel/env"],
  sourceMaps: "inline",
  retainLines: true
});
