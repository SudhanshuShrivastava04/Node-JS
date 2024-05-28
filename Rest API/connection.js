import mongoose from "mongoose";

//Connecting mongoDB
export async function connectMongoDB(url) {
  return mongoose.connect(url);
}
