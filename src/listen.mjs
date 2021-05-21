// @format
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require("dotenv").config();

import { app } from "./app.mjs";
import process from "process";

let { PORT } = process.env;
PORT = parseInt(PORT, 10);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
