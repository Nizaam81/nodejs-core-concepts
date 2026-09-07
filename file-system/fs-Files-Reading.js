const fs = require("fs")
fs.readFile("File","utf-8",(err, data) => {
    if (err) {
        console.log("error is here")
    } else {
        console.log(data)
    }
})