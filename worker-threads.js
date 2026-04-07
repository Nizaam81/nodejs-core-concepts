const { Worker } = require("worker_threads");

const worker = new Worker("./workerThreadExmapleFile.js");

worker.on("message", (data) => {
  console.log("Result:", data);
});

worker.on("error", (err) => {
  console.error("Error:", err);
});

worker.on("exit", (code) => {
  console.log("Worker exited:", code);
});
