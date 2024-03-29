import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import { connectToDB } from "./db/connectToDB.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const PORT = 5000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

connectToDB();

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT);
