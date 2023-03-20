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
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};

export const handleUserEditGET = (req, res) => {
	return res.render("edit-profile.pug", { pageTitle: "Edit Profile" });
};

export const handleUserEditPOST = async (req, res) => {
	const {
		session: {
			user: { _id },
		},
		body: { name, email, username, location },
	} = req;

	const exist = await User.exists({
		$and: [
			{ _id: { $ne: _id } }, //다른 아이디 중에서 찾을때..
			{ $or: [{ username: username }, { email: email }] },
		],
	});

	if (exist) {
		req.flash("error", "This username/email already taken.");
		return res.status(400).render("edit-profile.pug", {
			pageTitle: "Edit Profile",
		});
	}

	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{
			name,
			email,
			username,
			location,
		},
		{ new: true } //이전 데이터 지우고 새 오브젝트만 db에 저장
	);
	req.session.user = updatedUser; //session업데이트 안 하면 db만 업데이트 됨
	return res.redirect("/users/edit");
};


export const handleUserLogout = (req, res) => {
	req.session.destroy();
	return res.redirect("/");
};

export const handleChangePwdGET = (req, res) => {
	if (req.session.user.socialOnly === true) {
		return res.redirect("/");
	}
	return res.render("users/change-pwd.pug", { pageTitle: "Change Password" });
};

export const handleChangePwdPOST = async (req, res) => {
	const {
		session: {
			user: { _id },
		},
		body: { oldPassword, newPassword, newPasswordConfirmation },
	} = req;
	const user = await User.findById(_id);
	const ok = await bcrypt.compare(oldPassword, user.password);
	if (!ok) {
		return res.status(400).render("users/change-password", {
			pageTitle: "Change Password",
			errorMessage: "The current password is incorrect",
		});
	}
	if (newPassword !== newPasswordConfirmation) {
		return res.status(400).render("users/change-password", {
			pageTitle: "Change Password",
			errorMessage: "The password does not match the confirmation",
		});
	}
	user.password = newPassword;
	await user.save();
	return res.redirect("/users/logout");
};


export const handleUserDelete = (req, res) => res.send("USER DELETE PAGE");
export const handleUserProfile = (req, res) => res.send("USER PROFILE PAGE");

