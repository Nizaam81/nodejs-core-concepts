const fs = require("fs")
fs.appendFile("file", " - wwhat are you doing",()=> {
    console.log("file edited succefully")
})