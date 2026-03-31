const fs = require("fs");

console.log("start");

setTimeout(() => {
  console.log("timeout1");
  process.nextTick(() => console.log("nextTick in timeout"));
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

setImmediate(() => {
  console.log("immediate1");
});

fs.readFile(__filename, () => {
  console.log("readFile");

  setTimeout(() => console.log("timeout2"), 0);
  setImmediate(() => console.log("immediate2"));

  process.nextTick(() => console.log("nextTick in readFile"));
  Promise.resolve().then(() => console.log("promise in readFile"));
});

process.nextTick(() => console.log("nextTick1"));

Promise.resolve().then(() => console.log("promise1"));

console.log("end");
