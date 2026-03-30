import express from 'express'
import { protect } from '../middleware/authentication.js';
import { addComment, getLocalFeeds, getPostByCity, likesToggler, postLocalFeed } from '../controllers/LocalFeed.js';

const localRouter = express.Router();

localRouter.post('/local_post', protect, postLocalFeed);
localRouter.get('/get_local_feeds', protect, getLocalFeeds);
localRouter.post('/posts/:postId/like', protect, likesToggler);
localRouter.post('/posts/:postId/comment', protect, addComment);
localRouter.get('/posts/city/:city', protect, getPostByCity);

export default localRouter;