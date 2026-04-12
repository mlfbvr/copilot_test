import axios, { AxiosInstance } from 'axios';
import logger from '../logger.js';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type ErrorCategory = 'network' | 'http' | 'timeout' | 'unknown';

function categorizeAxiosError(error: unknown): { category: ErrorCategory; message: string; statusCode?: number } {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return { category: 'timeout', message: 'Request timed out' };
    }
    if (error.response) {
      return {
        category: 'http',
        message: `HTTP error ${error.response.status}`,
        statusCode: error.response.status,
      };
    }
    return { category: 'network', message: 'Network error' };
  }
  return { category: 'unknown', message: 'Unknown error' };
}

class PostService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
    });
  }

  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await this.client.get<BlogPost[]>('/posts');
      return response.data;
    } catch (error) {
      const { category, message, statusCode } = categorizeAxiosError(error);
      logger.error('Failed to fetch posts', { category, message, statusCode });
      throw new Error('Failed to fetch posts');
    }
  }

  async getPostById(id: number): Promise<BlogPost> {
    try {
      const response = await this.client.get<BlogPost>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      const { category, message, statusCode } = categorizeAxiosError(error);
      logger.error('Failed to fetch post', { postId: id, category, message, statusCode });
      throw new Error(`Failed to fetch post ${id}`);
    }
  }
}

export default new PostService();
