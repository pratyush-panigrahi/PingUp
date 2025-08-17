import express from 'express';
import { upload } from '../configs/multer.js';
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.post('/add', protect, upload.array('images', 4), addPost);
postRouter.get('/feed', protect, getFeedPosts);
postRouter.post('/like', protect, likePost);

export default postRouter;