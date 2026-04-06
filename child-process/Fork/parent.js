// Import fork from child_process (oS Module style)
const { fork } = require("child_process");

// Create child process and run child.js
const child = fork("./child.js");

// Send message to child process
child.send("nizam");

// Listen for message FROM child
child.on("message", (data) => {
  console.log("From child:", data);
});
