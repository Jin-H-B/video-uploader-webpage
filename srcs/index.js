import express from "express"; // web server
import morgan from "morgan"; // server logger

const app = express();
const logger = morgan("dev"); // server log options : combined, common, dev, short, tiny

const PORT = 3000;

app.use(logger);
app.get("/", (req, res) => {
	res.send("Hello world!!!");
});

app.listen(PORT, ()=>{
	console.log(`Listening on port ${PORT}`);
});

