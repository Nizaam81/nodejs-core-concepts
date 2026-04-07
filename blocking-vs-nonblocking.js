const fs = require("fs");

console.log("1. Start");

//  Blocking (Synchronous)
const data = fs.readFileSync("test.txt", "utf-8");
console.log("2. Blocking read done");

//  Non-blocking (Asynchronous)
fs.readFile("test.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("4. Non-blocking read done");
});

console.log("3. End");
