"use strict";
const autocannon = require("autocannon");

const url = "http://localhost:4000/api/users";
const config = {
  url: url,
  connections: 10000,
//   pipelining: 1, // Number of pipelined requests per connections
  duration: 30,
//   workers: 10,
};

const instance = autocannon(config);
autocannon.track(instance, { renderProgressBar: true });

// using callbacks func
instance.on("done", (result) => {
  console.log("Test completed.");
  console.log("Requests per second:", result.requests?.average || "N/A");
  console.log("Latency average:", result.latency?.average || "N/A");
  console.log("Latency max:", result.latency?.max || "N/A");
  console.log("Error count:", result.errors || 0);
});