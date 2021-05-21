// @format
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Successful response.");
});

export { app };
