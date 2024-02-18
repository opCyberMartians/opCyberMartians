// generate-manifest.js
const fs = require("fs");

const manifestTemplate = fs.readFileSync("src/manifest.env.json", "utf8");
const manifest = manifestTemplate.replace(
  "%process.env.REACT_APP_BASE_API%",
  `${process.env.REACT_APP_BASE_API}/*`
);
fs.writeFileSync("build/manifest.json", manifest);
