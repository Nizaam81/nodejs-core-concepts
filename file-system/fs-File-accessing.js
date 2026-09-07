const fs = require("fs");

fs.access("File", (err) => {
  if (err) {
    console.log("File cannot be accessed");
    return;
  }

  fs.readFile("File", "utf-8", (err, data) => {
    if (err) {
      console.log("Error while reading");
      return;
    }

    console.log(data);
  });
});
