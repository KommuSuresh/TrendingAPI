const express = require("express");
const videos = require("../TrendingData.json"); // Assuming your video data is stored in a file named TrendingData.json
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Route to get all videos or filter by title
app.get("/videos", (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      // If no search query is provided, send back all videos
      res.json(videos.videos);
    } else {
      // If search query is provided, filter videos based on the query
      const filteredVideos = videos.videos.filter((video) =>
        video.title.toLowerCase().includes(title.toLowerCase())
      );
      res.json(filteredVideos.length > 0 ? filteredVideos : { message: "No videos found" });
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a video by ID
app.get("/videos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const video = videos.videos.find((video) => video.id === id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
