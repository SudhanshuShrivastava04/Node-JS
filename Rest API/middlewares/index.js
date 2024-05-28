import fs from "fs";

export function logs(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${new Date().toLocaleDateString()} : ${req.method} : ${req.path} \n`,
      (err, data) => {
        next();
      }
    );
  };
}
