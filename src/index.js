//const express = require("express");

import express from "express";
import dotenv from "dotenv";//To be able to read the contents of the .env file
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

import { connectDB } from "./lib/db.js";


import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import statsRoutes from "./routes/stats.route.js";
//import path from "path";
import { error } from "console";

dotenv.config();//loads the content of the .env file into process.env


const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));

app.use(express.json());// to parse req.body
app.use(clerkMiddleware()); // this will add auth to req object => req.auth.userId  this is to check if user is authenticated
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits:{
        fileSize: 10 * 1024 * 1024, // 10mb max file size
    }
}));


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/song",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statsRoutes);

// error handler
app.use((err,req,res,next)=>{
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal Server error": err.message});
});

app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
    connectDB();
});

// todo socket.io will be implemented

