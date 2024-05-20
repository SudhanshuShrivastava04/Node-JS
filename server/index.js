import { createServer } from "http";
import fs from "fs";

const myServer = createServer((req, res) => {
  const log = `${new Date().toLocaleDateString()}: ${
    req.url
  } New request recieved \n`;

  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Hello from server, it's a Home Page");
        break;
      case "/about":
        res.end("Hello from server, it's a About Page");
      default:
        res.end("404 not found");
        break;
    }
  });
});

myServer.listen(8080, () => console.log("Server started!"));
