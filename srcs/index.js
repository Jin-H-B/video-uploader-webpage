import express from "express"; // web server
import morgan from "morgan"; // server logger
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev"); // server log options : combined, common, dev, short, tiny

const PORT = 3000;

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.get("/", (req, res) => {
	return res.send("Hello world!!!");
});

app.listen(PORT, ()=>{
	console.log(`Listening on port ${PORT}`);
});
