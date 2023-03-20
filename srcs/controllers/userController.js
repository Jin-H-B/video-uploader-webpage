import User from "../models/userSchema.js";

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

export const handleUserEdit = (req, res) => res.send("USER EDIT PAGE");
export const handleUserDelete = (req, res) => res.send("USER DELETE PAGE");

export const handleUserLogout = (req, res) => res.send("USER LOGOUT");
export const handleUserProfile = (req, res) => res.send("USER PROFILE PAGE");
