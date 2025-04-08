import express from "express";
import breeds from "./breeds.js";

const router = express.Router({ caseSensitive: true });

router.get("/breeds{/:id}", breeds);

export { router };
