const fs = require("node:fs");
const path = require("node:path");

console.log(path.resolve("./src"));

try {
	// Make folders
	fs.mkdirSync("./src");
	fs.mkdirSync("./_history");

	// Create vcs
	const content = {
		rootPath: path.resolve("./src"),
		commits: [],
	};

	fs.writeFileSync(".vcs", JSON.stringify(content));
} catch (err) {
	console.error(err);
}
