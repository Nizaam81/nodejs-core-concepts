// import crypto module
// crypto functions like pbkdf2 use libuv thread pool internally
const crypto = require("crypto");

// this runs immediately on main thread
console.log("Start");

// loop to create 6 async tasks
// remember: thread pool default size = 4
for (let i = 1; i <= 6; i++) {
  // this is a CPU-heavy async task
  // Node sends this task to libuv thread pool
  crypto.pbkdf2("password", "salt", 100000, 64, "sha512", () => {
    // this callback runs AFTER the task finishes
    // it does NOT run immediately
    console.log(`Task ${i} done`);
  });

  // IMPORTANT:
  // at this moment, task is NOT completed
  // it is only "submitted" to thread pool
}

// this also runs immediately (non-blocking)
console.log("End");

/*
===========================
WHAT HAPPENS INTERNALLY
===========================

Step 1:
Main thread runs:
→ "Start"
→ creates 6 tasks
→ "End"

Step 2:
Tasks go to thread pool

Thread pool has ONLY 4 threads:

Thread 1 → Task 1
Thread 2 → Task 2
Thread 3 → Task 3
Thread 4 → Task 4

Task 5 → goes to QUEUE (waiting)
Task 6 → goes to QUEUE (waiting)

Step 3:
When any thread finishes:
→ next task from queue starts

Example:
Thread 1 finishes Task 1
→ takes Task 5

Thread 2 finishes Task 2
→ takes Task 6

===========================
IMPORTANT CONCEPTS
===========================

// Thread Pool:
4 background workers handling tasks

// Queue:
extra tasks waiting when all threads are busy

// Non-blocking:
main thread does NOT wait for tasks

===========================
OUTPUT (order not guaranteed)
===========================

Start
End
Task 2 done
Task 1 done
Task 3 done
Task 4 done
Task 5 done
Task 6 done

===========================
KEY RULE
===========================

Only 4 tasks run at same time
Extra tasks → wait in queue

===========================
CHANGE THREAD POOL SIZE
===========================

Run this in terminal:

UV_THREADPOOL_SIZE=6 node file.js

Now:
→ 6 tasks run in parallel
→ no queue

===========================
WARNING
===========================

More threads ≠ always better

Too many threads:
→ CPU overload
→ slower performance
*/
