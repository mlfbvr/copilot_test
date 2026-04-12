import { Router, Request, Response, Router as ExpressRouter } from 'express';
import postService from '../services/postService.js';

const router: ExpressRouter = Router();

// GET /posts - Get all blog posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    });
  }
});

// GET /posts/:id - Get a specific blog post
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id) || !Number.isSafeInteger(id) || id < 1 || id > 100) {
      res.status(400).json({ error: 'Invalid post ID' });
      return;
    }

    const post = await postService.getPostById(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    });
  }
});

export default router;
