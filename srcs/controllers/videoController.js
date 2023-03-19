import Video from "../models/videoSchema.js";

export const handleVideoTrending = async (req, res) => {
	const videos = await Video.find({}).sort({ createdAt: "desc" });;
	return res.render("home.pug", { pageTitle: "Home", videos:videos });
};

export const handleVideoWatch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404.pug", { pageTitle: "Video not found." });
	}
	return res.render("watch.pug", { pageTitle: video.title, video:video });
};

export const handleVideoEditGET = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404.pug", { pageTitle: "Video not found." });
	}
	return res.render("edit.pug", { pageTitle: `Edit: ${video.title}`, video });
};

export const handleVideoEditPOST = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;
	const video = await Video.exists({ _id: id });
	if (!video) {
		return res.render("404,pug", { pageTitle: "Video not found" });
	}
	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags),
	});
	return res.redirect(`/videos/${id}`);
};

export const handleVideoUploadGET = (req, res) => {
	return res.render("upload.pug", { pageTitle: "Upload Video" });
};

export const handleVideoUploadPOST = async (req, res) => {
	const { title, description, hashtags } = req.body;
	try {
		await Video.create({
			title,
			description,
			hashtags: Video.formatHashtags(hashtags),
		});
		return res.redirect("/");
	} catch (error) {
		return res.render("upload", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
};

export const handleVideoSearch = async (req, res) => {
	const { keyword } = req.query;
	let videos = [];
	if (keyword) {
		videos = await Video.find({
			title: {
				$regex: new RegExp(`${keyword}$`, "i"),
			},
		});
	}
	return res.render("search.pug", { pageTitle: "Search", videos:videos });
};

export const handleVideoUpload = (req, res) => res.send("VIDEO UPLOAD PAGE");

export const handleVideoDelete = async (req, res) => {
	const { id } = req.params;
	await Video.findByIdAndDelete(id);
	return res.redirect("/");
  };
