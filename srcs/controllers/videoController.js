const fakeUser = {
	username: "whaleshade",
	loggedIn: false
};

let videos = [
	{
		title: "video #1",
		rating: 4,
		comments: 2,
		createdAt: "45 minutes ago",
		views: 3,
		id: 1,
	},
	{
		title: "video #2",
		rating: 5,
		comments: 2,
		createdAt: "32 minutes ago",
		views: 79,
		id: 2,
	},
	{
		title: "video #3",
		rating: 3,
		comments: 24,
		createdAt: "26 minutes ago",
		views: 67,
		id: 3,
	}
]

export const handleVideoTrending = (req, res) => {
	return res.render("home.pug", { pageTitle : "HOME", fakeUser:fakeUser, videos:videos });
};

export const handleVideoWatch = (req, res) => {
	const id = req.params.id;
	const video = videos[id - 1];
	return res.render("watch.pug", { pageTitle : `Watching ${video.title}`, fakeUser:fakeUser, id:id, video:video });
};

export const handleVideoEditGET = (req, res) => {
	const id = req.params.id;
	const video = videos[id - 1];
	return res.render("edit.pug", { pageTitle : `Editing: ${video.title}`, fakeUser:fakeUser, video:video });
};

export const handleVideoEditPOST = (req, res) => {
	const id = req.params.id;
	const title = req.body.title;
	videos[id - 1].title = title;
	return res.redirect(`/videos/${id}`);
};

export const handleVideoUploadGET = (req, res) => {
	return res.render("upload", { pageTitle: "Upload Video", fakeUser:fakeUser });
};

export const handleVideoUploadPOST = (req, res) => {
	const { title } = req.body;
	const newVideo = {
		title,
		rating: 0,
		comments: 0,
		createdAt: "just now",
		views: 0,
		id: videos.length + 1,
	};
	videos.push(newVideo);
	return res.redirect("/");
};

export const handleVideoSearch = (req, res) => res.send("VIDEO SEARCH PAGE");
export const handleVideoUpload = (req, res) => res.send("VIDEO UPLOAD PAGE");
export const handleVideoDelete = (req, res) => res.send("VIDEO DELETE PAGE");
