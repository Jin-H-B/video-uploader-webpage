const fakeUser = {
	username: "whaleshade",
	loggedIn: false
};

export const handleVideoTrending = (req, res) => {
	const videos = [
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
	return res.render("home.pug", { pageTitle : "HOME", fakeUser:fakeUser, videos:videos })
};
export const handleVideoWatch = (req, res) => res.render("watch.pug", { pageTitle : "WATCH" });
export const handleVideoEdit = (req, res) => res.render("edit.pug", { pageTitle : "EDIT" });
export const handleVideoSearch = (req, res) => res.send("VIDEO SEARCH PAGE");
export const handleVideoUpload = (req, res) => res.send("VIDEO UPLOAD PAGE");
export const handleVideoDelete = (req, res) => res.send("VIDEO DELETE PAGE");
