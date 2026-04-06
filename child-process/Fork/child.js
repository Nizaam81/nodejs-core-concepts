// Listen for message FROM parent
process.on("message", (data) => {
  console.log("From parent:", data);

  // Send message BACK to parent
    process.send("Hello from child");
    

    // Send multiple values as ONE object


/* process.send({
    message: "Hello from child",
    receivedData: data
  });
*/




});
