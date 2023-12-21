const fs = require("node:fs");
const path = require("node:path");

try {
	const data = fs.readFileSync("./.vcs", "utf8");
	let newRepoState = JSON.parse(data);

	console.log(
		newRepoState.commits.map((commit) => ({
			commitId: commit.commitID,
			timestamp: commit.timestamp,
			message: commit.message,
		}))
	);
} catch (error) {
	console.error("Commit", error);
}
