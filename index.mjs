import express from "express";
import { auth, fileRoutes, groups, tracing, user } from "./Routes/index.js";
import connectDb from "./config/conectDb.mjs";
import { configDotenv } from "dotenv";
import { notfound, errorHandler } from "./middleware/errorMiddleware.mjs";
import cors from "cors";

configDotenv();
connectDb();
const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(cors());

app.use("/api", auth);
app.use("/api", tracing);
app.use("/api", groups);
app.use("/api", user);
app.use("/api", fileRoutes);

app.use(notfound);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("server is running");
});
