const fs = require("node:fs");
const path = require("node:path");

try {
	const data = fs.readFileSync("./.vcs", "utf8");
	let newRepoState = JSON.parse(data);

	// Get commit from cli
	const searchingCommitId = process.argv[2];

	// Check if exist
	const revertCommit = newRepoState.commits.find((commit) => {
		return commit.commitID === Number(searchingCommitId);
	});

	// Copy hist from that commit  and place into src
	if (revertCommit) {
		fs.rmSync(newRepoState.rootPath, { recursive: true });
		fs.cpSync(revertCommit.snapshotPath, newRepoState.rootPath, {
			recursive: true,
			force: true, // TODO lookup
		});
	}
} catch (error) {
	console.error("Revert", error);
}
