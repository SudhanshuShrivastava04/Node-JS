import { writeFileSync, writeFile, readFileSync, readFile, appendFileSync, cpSync } from "fs";

//write file Sync / blocking
writeFileSync("./test01.txt", "Test sync file system"); //blocking

//write file Async / non - blocking
writeFile("./test02.txt", "Test async file system", (err) => {
  if (err) {
    console.log(err);
  }
});

//read file Async
const data01 = readFileSync("./test01.txt", "utf-8");
console.log(data01);

//read file Async
readFile("./test02.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// append data sync
appendFileSync("./test01.txt", `\n  ${new Date().toString()}`);

//copy file sync
cpSync("./test01.txt", "./copy-of-test01.txt");
