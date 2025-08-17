import express from 'express';
import { upload } from '../configs/multer.js';
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.get('/:userId', sseController)
messageRouter.post('/send', upload.single('image'), protect, sendMessage)
messageRouter.post('/get', protect, getChatMessages)

export default messageRouter;