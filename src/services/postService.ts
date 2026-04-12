import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
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
      throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPostById(id: number): Promise<BlogPost> {
    try {
      const response = await this.client.get<BlogPost>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch post ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new PostService();
