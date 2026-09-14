import os from "os";
import fs from "fs";

console.log("Hello from Node.js server!");

console.log("Hostname:", os.hostname());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());

fs.writeFile("output.txt", "This is a sample output from Node.js server.", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("Output written to output.txt");
  }
});