const fs = require("fs")
fs.rename("file", "File", () => {
    console.log("file name changed ")
})