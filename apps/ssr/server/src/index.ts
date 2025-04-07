import express from "express";
import { devRouter, prodRouter } from "./routes/index.js";
const app = express();
const isDev = process.env.NODE_ENV === "development";
app.use(express.static("dist/client", { index: false }));
// app.use(express.static("dist/assets", { index: false }));

const PORT = isDev ? 3000 : 3001;

console.log({ isDev });

app.get(/(.*)/, isDev ? devRouter : prodRouter);

app.listen(PORT, () => {
  console.log("Listen at http://localhost:" + PORT);
});
