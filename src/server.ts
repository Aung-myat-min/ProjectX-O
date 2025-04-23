import express from "express";
import config from "./config";

const app = express();

app.listen(config.port, () => {
	console.log(`Server running at http://localhost:${config.port}`);
});
