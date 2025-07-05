import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import randomInt from "random-int";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
    if (n === 0) {
        console.log("✅ All commits done. Pushing to GitHub...");
        await git.push("origin", "main"); // or "master"
        return;
    }

    const x = randomInt(0, 54);
    const y = randomInt(0, 6);
    const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

    const data = { date };
    console.log("Commit on:", date);

    jsonfile.writeFile(path, data, async () => {
        await git.add([path]);
        await git.commit(date, { "--date": date });
        makeCommits(n - 1);
    });
};

makeCommits(2000); // Start with 10, test before doing 1000+
