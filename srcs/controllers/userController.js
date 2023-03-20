import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const handleUserJoinGET = (req, res) => res.render("join.pug", { pageTitle: "Join" });

export const handleUserJoinPOST = async (req, res) => {
	const { name, username, email, password, password2, location } = req.body;
	const pageTitle = "Join";
	if (password !== password2) {
		return res.status(400).render("join.pug", {
			pageTitle,
			errorMessage: "Password confirmation does not match.",
		});
	}
	const isUser = await User.exists({ $or: [{ username }, { email }] });
	if (isUser) {
		return res.status(400).render("join.pug", {
			pageTitle,
			errorMessage: "This username/email is already taken.",
		});
	}
	try {
		await User.create({
			name,
			username,
			email,
			password,
			location,
		});
		return res.redirect("/login");
	} catch (error) {
		return res.status(400).render("join", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
};


export const handleUserLoginGET = (req, res) =>
	res.render("login", { pageTitle: "Login" });

export const handleUserLoginPOST = async (req, res) => {
	const { username, password } = req.body;
	const pageTitle = "Login";
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).render("login", {
			pageTitle: "Login",
			pageTitle,
			errorMessage: "An account with this username does not exists.",
		});
	}
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) {
		return res.status(400).render("login", {
			pageTitle,
			errorMessage: "Wrong password",
		});
	}
	return res.redirect("/");
};



export const handleUserEdit = (req, res) => res.send("USER EDIT PAGE");
export const handleUserDelete = (req, res) => res.send("USER DELETE PAGE");

export const handleUserLogout = (req, res) => res.send("USER LOGOUT");
export const handleUserProfile = (req, res) => res.send("USER PROFILE PAGE");
