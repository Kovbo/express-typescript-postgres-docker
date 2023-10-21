import express from "express";
import { tasksRouter } from "./router/tasksRouter";
import { authRouter } from "./router/authRouter";
require("dotenv").config();
import cors from "cors";

const app = express();

import errorHandlerMiddleware from "./middleware/error-handler";
import {
  initializePassport,
  initializePassportSession,
  sessionConfig,
} from "./passport/config";

app.use(
  cors({
    origin: "*",
  })
);
app.use(initializePassport()); // Use the initialize function here
app.use(sessionConfig());
app.use(initializePassportSession());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(tasksRouter);
app.use(errorHandlerMiddleware);

app.listen(3001);
