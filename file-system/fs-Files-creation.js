const fs = require("fs")
fs.writeFile("file","Hello Nizaam How are you",() => {
    console.log("file created successfuly")
})