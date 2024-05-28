import express from "express";
import router from "./routes/user.js";
import { connectMongoDB } from "./connection.js";
import { logs } from "./middlewares/index.js";

const app = express();
const PORT = 8000;

//Connection MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/app-01")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB error : ", err));

//Middleware - plugin
app.use(express.urlencoded({ extended: false }));
app.use(logs("log.txt"));

//Routes
app.use("/api/users", router);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
