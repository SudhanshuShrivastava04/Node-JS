import { createServer } from "http";
import fs from "fs";
import url from "url";

const myServer = createServer((req, res) => {
  if (req.url == "/favicon.ico") return res.end();

  const log = `${new Date().toLocaleDateString()}: ${
    req.url
  } New request recieved \n`;

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Hello from server, it's a Home Page");
        break;
      case "/about":
        const userName = myUrl.query.name
        res.end(`Hello ${userName} from server, it's a About Page`);
        break;
      default:
        res.end("404 not found");
        break;
    }
  });
});

myServer.listen(8080, () => console.log("Server started!"));
