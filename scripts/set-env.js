const fs = require("fs");
const commitInfo = require("git-commit-info");

const version = require("../package.json").version;
const commit = commitInfo().shortHash;
const date = new Date().toISOString().split("T")[0];

const envData = `
REACT_APP_VERSION=${version}
REACT_APP_COMMIT=${commit}
REACT_APP_BUILD_DATE=${date}
`;

fs.writeFileSync(".env", envData);
console.log("✅ .env file generated:", envData);
