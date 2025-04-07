import express from "express";
import { devRouter } from "./routes/index.js";
const app = express();
const isDev = process.env.NODE_ENV === "development";
// app.use(express.static("dist/client", { index: false }));
// app.use(express.static("dist/assets", { index: false }));

const PORT = isDev ? 3000 : 3001;

app.get(/(.*)/, isDev ? devRouter : devRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log("Listen at http://localhost:" + PORT);
});
