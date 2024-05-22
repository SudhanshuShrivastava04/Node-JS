import { createServer } from "http";
import fs from "fs";
import url from "url";

//express will handle these http methods for every route
const handler = (req, res) => {
  if (req.url == "/favicon.ico") return res.end();

  const log = `${new Date().toLocaleDateString()}: ${req.method} ${
    req.url
  } New request recieved \n`;

  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Hello from server, it's a Home Page");
        break;
      case "/about":
        const userName = myUrl.query.name;
        res.end(`Hello ${userName} from server, it's a About Page`);
        break;
      case "/search":
        const search = myUrl.query.search;
        res.end("Here are your results for " + search);
        break;
      case "/signup":
        if (req.method === "GET") res.end("Here is the signup page");
        else if (req.method === "POST") {
          // db query
          res.end("You have been signed up");
        }
        break;
      default:
        res.end("404 not found");
        break;
    }
  });
};
const myServer = createServer(handler);

myServer.listen(8080, () => console.log("Server started!"));
