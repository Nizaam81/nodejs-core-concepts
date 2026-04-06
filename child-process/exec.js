const { exec } = require("child_process");

// exec function have 3 parameters comond , options , call back
// this is without options

exec("git status", (err, stdout, stderr) => {
  if (err) {
    console.log("Execution error:", err.message);
    return;
  }

  if (stderr) {
    console.log("Command stderr:", stderr);
  }

  console.log("Output:", stdout);
});

// here with options
const { exec } = require("child_process");

exec(
  "git status",
  {
    cwd: "C:\\Users\\nizam\\OneDrive\\Desktop\\nodejs-core-concepts", // run inside this folder
    timeout: 5000, // stop after 5 sec
    maxBuffer: 1024 * 1024, // buffer size
  },
  (err, stdout, stderr) => {
    if (err) {
      console.log("Execution error:", err.message);
      return;
    }

    if (stderr) {
      console.log("Command stderr:", stderr);
    }

    console.log("Output:\n", stdout);
  },
);
