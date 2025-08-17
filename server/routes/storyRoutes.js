import express from "express";
import { upload } from "../configs/multer.js";
import { addUserStory, getStories } from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";

const storyRouter = express.Router();

// Create a new story
storyRouter.post("/create", upload.single("media"), protect, addUserStory);

// Get stories
storyRouter.get("/get", protect, getStories);

export default storyRouter;