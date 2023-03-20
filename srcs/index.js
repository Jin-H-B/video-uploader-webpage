import "./db.js"; // connect to mongodb
import "./models/videoSchema.js"; // mongodb schema for video data
import "./models/userSchema.js"; // login user schema
import "dotenv/config";
import express from "express"; // web server
import morgan from "morgan"; // server logger
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("combined"); // server log options : combined, common, dev, short, tiny

const PORT = 3000;

app.set('view engine', 'pug');
app.set("views", process.cwd() + "/srcs/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,				//true: 매 req에서 변경 유무 관계없이 무조건 session 저장,
		saveUninitialized: false,	//true: 세션 변경(로그인하면 바뀌게 코딩) 없어도 저장..즉 로그인 안한사람도 저장. 아무 내용 없는 session을 계속해서 저장
		store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
	})
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); //express.static("[노출 시키려는 폴더]")
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.get("/", (req, res) => {
	return res.send("Hello world!!!");
});

app.listen(PORT, ()=>{
	console.log(`Listening on port ${PORT}`);
});

