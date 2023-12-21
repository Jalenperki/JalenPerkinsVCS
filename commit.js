const fs = require("node:fs");

const path = require("node:path");

try {
	const data = fs.readFileSync("./.vcs", "utf8");
	let newRepoState = JSON.parse(data);

	const COMMITID = Date.now();
	const HISTORY_PATH = path.resolve("./_history") + `/commit-${COMMITID}`;

	const newCommit = {
		commitID: COMMITID,
		timestamp: COMMITID,
		message: process.argv[2], // From cli
		snapshotPath: HISTORY_PATH,
	};

	fs.cpSync(newRepoState.rootPath, HISTORY_PATH, {
		recursive: true,
		force: true, // TODO lookup
	});

	newRepoState.commits.push(newCommit);

	// Override State
	fs.writeFileSync(".vcs", JSON.stringify(newRepoState));
} catch (error) {
	console.error("Commit", error);
}
