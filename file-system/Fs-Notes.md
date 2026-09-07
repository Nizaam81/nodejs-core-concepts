Node.js fs Module — Core & Practical Notes

fs = File System

Used to create, read, update, delete, inspect, and stream files/directories.

0. Import

CommonJS

const fs = require("fs");

Promise API

const fs = require("fs/promises");

1. fs.access()

Checks whether a path can be accessed and optionally checks permissions.

Syntax

fs.access(path, mode, callback);

Callback

(err)

Example

fs.access("test.txt", fs.constants.R_OK, (err) => {
    if (err) {
        console.log("Cannot read the file");
        return;
    }

    console.log("File is readable");
});

Modes

fs.constants.F_OK // path is accessible
fs.constants.R_OK // readable
fs.constants.W_OK // writable
fs.constants.X_OK // executable

Combine modes:

fs.constants.R_OK | fs.constants.W_OK

fs.access() does not return file contents.

Sync

fs.accessSync(path, mode);

2. fs.readFile()

Reads the whole file asynchronously.

Syntax

fs.readFile(path, options, callback);

Callback

(err, data)

Example

fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});

Without "utf8":

fs.readFile("test.txt", (err, data) => {
    console.log(data); // Buffer
});

Sync

const data = fs.readFileSync("test.txt", "utf8");

Remember

readFile()      → async
readFileSync()  → sync / blocking

3. fs.writeFile()

Creates a file or replaces existing content.

Syntax

fs.writeFile(file, data, options, callback);

Example

fs.writeFile("test.txt", "Hello Node.js", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("File written");
});

If the file already contains:

Hello World

and you run:

fs.writeFile("test.txt", "Hi", callback);

the result is:

Hi

Sync

fs.writeFileSync("test.txt", "Hello");

4. fs.appendFile()

Adds data to the end of a file.

Syntax

fs.appendFile(file, data, options, callback);

Example

fs.appendFile("test.txt", "\nNew line", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Data appended");
});

Sync

fs.appendFileSync("test.txt", "\nNew line");

Difference

writeFile()
    ↓
replace old content

appendFile()
    ↓
add after existing content

5. fs.rename()

Renames a file/directory or moves it to another path.

Syntax

fs.rename(oldPath, newPath, callback);

Example

fs.rename("old.txt", "new.txt", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Renamed");
});

Sync

fs.renameSync("old.txt", "new.txt");

6. fs.unlink()

Deletes a file.

Syntax

fs.unlink(path, callback);

Example

fs.unlink("test.txt", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Deleted");
});

Sync

fs.unlinkSync("test.txt");

unlink() is for files.

7. fs.mkdir()

Creates a directory.

Syntax

fs.mkdir(path, options, callback);

Example

fs.mkdir("uploads", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Directory created");
});

Nested directories

fs.mkdir("uploads/images/profile", { recursive: true }, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Created");
});

Sync

fs.mkdirSync("uploads", { recursive: true });

8. fs.readdir()

Reads the contents of a directory.

Syntax

fs.readdir(path, options, callback);

Callback

(err, files)

Example

fs.readdir(".", (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(files);
});

Example result:

["app.js", "test.txt", "uploads"]

With file type information

fs.readdir(".", { withFileTypes: true }, (err, entries) => {
    if (err) return console.log(err);

    entries.forEach((entry) => {
        console.log(entry.name);
        console.log(entry.isFile());
        console.log(entry.isDirectory());
    });
});

Sync

const files = fs.readdirSync(".");

9. fs.rm()

Removes a file or directory.

Syntax

fs.rm(path, options, callback);

Delete a file

fs.rm("test.txt", (err) => {
    if (err) return console.log(err);
});

Delete directory + contents

fs.rm("uploads", {
    recursive: true,
    force: true
}, (err) => {
    if (err) return console.log(err);
});

recursive: true → remove contents

force: true → ignore a missing path

Sync

fs.rmSync("uploads", {
    recursive: true,
    force: true
});

rmdir()

fs.rmdir(path, callback);

rmdir() is mainly for empty directories; rm() is the more useful modern removal API.

10. fs.stat()

Gets information about a file or directory.

Syntax

fs.stat(path, callback);

Callback

(err, stats)

Example

fs.stat("test.txt", (err, stats) => {
    if (err) return console.log(err);

    console.log(stats.size);
    console.log(stats.isFile());
    console.log(stats.isDirectory());
});

Useful methods

stats.isFile()
stats.isDirectory()
stats.isSymbolicLink()

Useful properties

stats.size
stats.birthtime
stats.mtime
stats.ctime
stats.mode

Sync

const stats = fs.statSync("test.txt");

11. fs.lstat()

Similar to stat(), but for a symbolic link it reports information about the link itself instead of following it.

fs.lstat("my-link", (err, stats) => {
    if (err) return console.log(err);

    console.log(stats.isSymbolicLink());
});

Remember

stat()
  ↓
follows symbolic link

lstat()
  ↓
checks the link itself

12. fs.copyFile()

Copies a file.

Syntax

fs.copyFile(src, dest, mode, callback);

Example

fs.copyFile("source.txt", "backup.txt", (err) => {
    if (err) return console.log(err);

    console.log("Copied");
});

Sync

fs.copyFileSync("source.txt", "backup.txt");

13. fs.truncate()

Changes the size of a file.

Syntax

fs.truncate(path, len, callback);

Example:

fs.truncate("test.txt", 10, (err) => {
    if (err) return console.log(err);

    console.log("File size changed");
});

10 means the file is truncated to 10 bytes.

Sync

fs.truncateSync("test.txt", 10);

14. fs.chmod()

Changes file/directory permissions.

Syntax

fs.chmod(path, mode, callback);

Example

fs.chmod("script.sh", 0o755, (err) => {
    if (err) return console.log(err);

    console.log("Permissions changed");
});

Sync

fs.chmodSync("script.sh", 0o755);

Permission behavior depends on the operating system.

15. fs.chown()

Changes owner/group of a file.

Syntax

fs.chown(path, uid, gid, callback);

Example

fs.chown("test.txt", 1000, 1000, (err) => {
    if (err) console.log(err);
});

Sync

fs.chownSync("test.txt", 1000, 1000);

Mostly relevant on Unix/Linux systems and may require privileges.

16. File Descriptors

A file descriptor (fd) is a number that identifies an open file.

Typical flow:

open()
  ↓
fd
  ↓
read() / write()
  ↓
close()

17. fs.open()

Opens a file and gives a file descriptor.

Syntax

fs.open(path, flags, mode, callback);

Callback

(err, fd)

Example

fs.open("test.txt", "r", (err, fd) => {
    if (err) return console.log(err);

    console.log("FD:", fd);

    fs.close(fd, (err) => {
        if (err) console.log(err);
    });
});

Common flags

r   → read
w   → write / create / truncate
a   → append / create
r+  → read + write
w+  → read + write / truncate
a+  → read + append

18. fs.close()

Closes a file descriptor.

Syntax

fs.close(fd, callback);

Example

fs.close(fd, (err) => {
    if (err) return console.log(err);

    console.log("Closed");
});

19. fs.read()

Low-level read using an open file descriptor.

Syntax

fs.read(fd, buffer, offset, length, position, callback);

Callback

(err, bytesRead, buffer)

Example

fs.open("test.txt", "r", (err, fd) => {
    if (err) return console.log(err);

    const buffer = Buffer.alloc(10);

    fs.read(fd, buffer, 0, 10, 0, (err, bytesRead) => {
        if (err) return console.log(err);

        console.log(bytesRead);
        console.log(buffer.toString());

        fs.close(fd, () => {});
    });
});

Lower-level than readFile().

20. fs.write()

Low-level write using a file descriptor.

Syntax

fs.write(fd, buffer, offset, length, position, callback);

A common string form is:

fs.write(fd, string, position, encoding, callback);

Example

fs.open("test.txt", "w", (err, fd) => {
    if (err) return console.log(err);

    fs.write(fd, "Hello Node.js", (err) => {
        if (err) return console.log(err);

        fs.close(fd, () => {});
    });
});

21. fs.createReadStream()

Reads a file chunk by chunk.

Best for large files.

Syntax

fs.createReadStream(path, options);

Example

const stream = fs.createReadStream("large.txt", {
    encoding: "utf8"
});

stream.on("data", (chunk) => {
    console.log(chunk);
});

stream.on("end", () => {
    console.log("Finished");
});

stream.on("error", (err) => {
    console.log(err);
});

Mental model

Large file
   ↓
ReadStream
   ↓
chunks
   ↓
process chunk by chunk

22. fs.createWriteStream()

Writes data using a stream.

Syntax

fs.createWriteStream(path, options);

Example

const stream = fs.createWriteStream("output.txt");

stream.write("Hello\n");
stream.write("Node.js\n");

stream.end();

23. pipe()

Connects a readable stream to a writable stream.

Example

const readStream = fs.createReadStream("large.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);

Mental model

large.txt
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
copy.txt

Useful for large files because the entire file does not need to be loaded into memory at once.

24. fs.watch()

Watches a file or directory for changes.

Syntax

fs.watch(filename, options, listener);

Example

fs.watch("test.txt", (eventType, filename) => {
    console.log(eventType, filename);
});

Common event types:

change
rename

Watch behavior can differ between operating systems.

25. Promise API

Use:

const fs = require("fs/promises");

Example

async function readData() {
    try {
        const data = await fs.readFile("test.txt", "utf8");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

readData();

Important Promise methods use the same names:

fs.access()
fs.readFile()
fs.writeFile()
fs.appendFile()
fs.rename()
fs.unlink()
fs.mkdir()
fs.readdir()
fs.rm()
fs.stat()
fs.copyFile()

26. Callback vs Sync vs Promise

Example: reading a file.

Callback

fs.readFile("test.txt", "utf8", (err, data) => {
    console.log(data);
});

Sync

const data = fs.readFileSync("test.txt", "utf8");

Promise

const fs = require("fs/promises");

const data = await fs.readFile("test.txt", "utf8");

Remember

Callback API
    ↓
asynchronous

Sync API
    ↓
blocking

Promise API
    ↓
asynchronous + async/await friendly

27. Important Difference: readFile() vs createReadStream()

readFile()
    ↓
loads the whole file

createReadStream()
    ↓
reads chunks

Use:

small/simple file
    → readFile()

large file / download / streaming
    → createReadStream()

28. Important Difference: writeFile() vs appendFile()

writeFile()
    ↓
replace content

appendFile()
    ↓
add content at the end

29. Important Difference: unlink() vs rm()

unlink()
    ↓
delete file

rm()
    ↓
remove file or directory

For a directory with contents:

fs.rm("uploads", {
    recursive: true,
    force: true
}, callback);

30. Important Difference: access() vs stat()

access()
    ↓
Can I access it?
Can I read/write/execute it?

stat()
    ↓
What information does it have?
size, type, timestamps, etc.

In production code, avoid using access() as a pre-check before another operation when you can simply perform the operation and handle its error.

31. Core FS Cheat Sheet

Method

Main purpose

Main parameters

access()

Check access/permission

path, mode, callback

readFile()

Read whole file

path, options, callback

writeFile()

Create/replace

file, data, options, callback

appendFile()

Add content

file, data, options, callback

rename()

Rename/move

oldPath, newPath, callback

unlink()

Delete file

path, callback

mkdir()

Create directory

path, options, callback

readdir()

List directory

path, options, callback

rm()

Remove file/dir

path, options, callback

stat()

Get metadata

path, callback

lstat()

Info about link itself

path, callback

copyFile()

Copy file

src, dest, mode, callback

truncate()

Change file size

path, len, callback

chmod()

Change permissions

path, mode, callback

chown()

Change owner

path, uid, gid, callback

open()

Open file

path, flags, mode, callback

close()

Close descriptor

fd, callback

read()

Low-level read

fd, buffer, offset, length, position, callback

write()

Low-level write

fd, data..., callback

createReadStream()

Read chunks

path, options

createWriteStream()

Write stream

path, options

watch()

Watch changes

filename, options, listener

32. Exam / Interview Priority

🔴 Must Know

readFile()
writeFile()
appendFile()
rename()
unlink()
mkdir()
readdir()
stat()
access()

🔴 Very Important for servers

createReadStream()
createWriteStream()
pipe()

These matter for:

HTTP file serving
file downloads
large files
streaming
Express responses

🟡 Know the concept

rm()
copyFile()
watch()
open()
close()
read()
write()
file descriptors

🟢 Lower priority

chmod()
chown()
lstat()
truncate()

33. Best Mental Model

                         fs
                          |
        +-----------------+-----------------+
        |                 |                 |
       FILES          DIRECTORIES        STREAMS
        |                 |                 |
   readFile()           mkdir()        createReadStream()
   writeFile()          readdir()      createWriteStream()
   appendFile()         rm()           pipe()
   rename()
   unlink()
   copyFile()
        |
   FILE INFO
        |
   access()
   stat()
   lstat()

34. One-Minute Revision

Need to check access?
→ access()

Need to read entire file?
→ readFile()

Need to write/replace?
→ writeFile()

Need to add?
→ appendFile()

Need to rename/move?
→ rename()

Need to delete file?
→ unlink()

Need to create directory?
→ mkdir()

Need to list directory?
→ readdir()

Need file metadata?
→ stat()

Need to copy?
→ copyFile()

Need large-file streaming?
→ createReadStream()

Need streaming write?
→ createWriteStream()

Need to connect streams?
→ pipe()

Need low-level file control?
→ open() → read()/write() → close()