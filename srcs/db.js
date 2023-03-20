import mongoose from "mongoose";

mongoose.connect(
	'mongodb://mongo:27017/videodb', // mongodb://[container name or ipddress]:27017/[dbname]
	{ useNewUrlParser: true },
);

const db = mongoose.connection;

console.log("check")

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

