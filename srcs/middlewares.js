import multer from "multer";

export const localsMiddleware = (req, res, next) => {
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.siteName = "video_webpage";
	res.locals.loggedInUser = req.session.user || {};
	next();
};

export const protectorMiddleware = (req, res, next) => {
	if (req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleware = (req, res, next) => {
	if (!req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/");
	}
};

export const avatarUploadMiddleware = multer({
	dest: "uploads/avatars/", // dest: 업로드할 파일의 디렉터리
	// limits: {
	//   fileSize: 3000000,
	// },
  });
  export const videoUploadMiddleware = multer({
	dest: "uploads/videos/",
	// limits: {
	//   fileSize: 10000000,
	// },
  });
