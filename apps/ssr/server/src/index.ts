import express from "express";
import cookieParser from "cookie-parser";
import { devRouter, prodRouter, apiRouter } from "./routes/index.js";
const app = express();
const isDev = process.env.NODE_ENV === "development";
app.use(cookieParser());
app.use(express.json());
app.use(express.static("dist/client", { index: false }));
// app.use(express.static("dist/assets", { index: false }));

const PORT = isDev ? 3000 : 3001;

console.log({ isDev });

app.use("/api", apiRouter);
app.get(/(.*)/, isDev ? devRouter : prodRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!!!");
});

app.listen(PORT, () => {
  console.log("Listen at http://localhost:" + PORT);
});
