import mongoose from 'mongoose';
import { DB_URL } from "../configs/index.js";

export default async function databaseConnection() {
  try {
    await mongoose.connect(DB_URL).then(()=>{
      console.log('Connected to mongodb..');
    }).catch(()=>{
        console.log('Mongodb connection error..', error);
    });
  } catch (error) {
    console.log("error in connecting DB:", error);
    throw error;
  }
}