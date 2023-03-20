import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
	process.env.DB_URL, // mongodb://[container name or ipddress]:27017/[dbname]
	{ useNewUrlParser: true },
);

const db = mongoose.connection;

console.log("check")

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

