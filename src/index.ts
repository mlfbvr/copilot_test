import express from 'express';
import postRoutes from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({
  limit: '10kb',
  strict: true,
}));

// Routes
app.use('/posts', postRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
