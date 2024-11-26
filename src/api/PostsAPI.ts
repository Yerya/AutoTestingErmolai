import axios from 'axios';

export class PostsAPI {
    private static BASE_URL = 'https://jsonplaceholder.typicode.com';

    static async getPosts(): Promise<any[]> {
        const { data } = await axios.get(`${this.BASE_URL}/posts`);
        if (Array.isArray(data)) return data;
        throw new Error('Unexpected response format');
    }

    static async getCommentsByPostId(postId: number): Promise<any[]> {
        const { data } = await axios.get(`${this.BASE_URL}/comments`, { params: { postId } });
        if (Array.isArray(data)) return data;
        throw new Error('Unexpected response format');
    }

    static async createPost(postData: { title: string; body: string; userId: number }): Promise<any> {
        const { data } = await axios.post(`${this.BASE_URL}/posts`, postData);
        if (data && typeof data === 'object') return data;
        throw new Error('Unexpected response format');
    }
}
