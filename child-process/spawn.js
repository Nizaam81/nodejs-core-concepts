const { spawn } = require("child_process");

// create child process
const child = spawn("node", ["-v"]);

// standard output
child.stdout.on("data", (data) => {
  console.log("Output:", data.toString());
});

// error output from command
child.stderr.on("data", (data) => {
  console.error("Error output:", data.toString());
});

// error while starting process
child.on("error", (err) => {
  console.error("Failed to start process:", err.message);
});

// when process ends
child.on("close", (code) => {
  console.log("Process exited with code:", code);
});
