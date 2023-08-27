import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import dbConnect from './db-Config.js';
import { signIn, signUp, userVarify } from './controler.js';


dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
 
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.url);
    console.log("Request headers:", req.headers);
    console.log("Request BODY:", req.body);
    console.log("Request Query:", req.query);
    console.log("Request Params:", req.params);
    console.log("Request files:", req.files);
    console.log("Request file:", req.file);
    next();
  });
  app.use("/signin", signIn); // Use the sign in  
  app.use("/signup", signUp); // Use the sign up  
  app.use("/varify", userVarify); // Use the sign up  

  dbConnect()
  .then((res) => console.log(res))    
  .catch((err) =>console.log(err));

  app.listen(port, () => {
    console.log("server running");
    console.log(`https://localhost:${port}`);
  });