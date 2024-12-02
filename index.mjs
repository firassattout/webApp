import express from "express";
import { auth, groups, user } from "./Routes/index.js";
import connectDb from "./config/conectDb.mjs";
import { configDotenv } from "dotenv";
import { notfound, errorHandler } from "./middleware/errorMiddleware.mjs";
import cors from "cors";
import { checkUser } from "./middleware/checkUser.mjs";

configDotenv();
connectDb();
const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(cors());

app.use(checkUser);
app.use("/api", auth);
app.use("/api", groups);
app.use("/api", user);

app.use(notfound);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("server is running");
});
