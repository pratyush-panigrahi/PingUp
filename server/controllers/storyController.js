import fs from "fs";
import imagekit from "../configs/imageKit.js";
import { inngest } from "../inngest/index.js";
import Story from "../models/Story.js";
import User from "../models/User.js";

//Add user Story
export const addUserStory = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { content, media_type, background_color } = req.body;
        const media = req.file;
        let media_url = "";

        // upload media to imagekit
        if (media && (media_type === "image" || media_type === "video")){
            const fileBuffer = fs.readFileSync(media.path);
            const response = await imagekit.upload({
            file: fileBuffer,
            fileName: media.originalname,
    })

    media_url = response.url;
    }
    // create story
    const story = await Story.create({
    user: userId,
    content,
    media_url,
    media_type,
    background_color,
    })

    // schedule story deletion after 24 hours
    await inngest.send({
        name: 'app/story.delete',
        data: { storyId: story._id}
    })

    res.json({success: true,message: "Story added successfully"})
} catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message});
}
}

// Get Stories
export const getStories = async (req, res) => {
try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
    return res.json({ success: false, message: "User not found" });
    }
    const userIds = [userId, ...user.connections, ...user.following];

    const stories = await Story.find({
    user: { $in: userIds }
    }).populate("user").sort({ createdAt: -1 });

    res.json({ success: true, stories });
} catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
}
}
