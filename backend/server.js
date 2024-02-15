import dotenv from "dotenv";
import express from "express";

import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
