import { describe, it, expect } from 'vitest';
import { PostsAPI } from '../src/api/PostsAPI';

describe('PostsAPI', () => {
    it('should fetch posts and have more than 0 elements', async () => {
        const posts = await PostsAPI.getPosts();
        expect(posts.length).toBeGreaterThan(0);
    });

    it('should fetch comments for a specific postId and verify all have the correct postId', async () => {
        const postId = 1;
        const comments = await PostsAPI.getCommentsByPostId(postId);
        expect(comments.length).toBeGreaterThan(0);
        comments.forEach((comment) => expect(comment.postId).toBe(postId));
    });

    it('should create a post and return the correct response', async () => {
        const postData = { title: 'test title', body: 'test body', userId: 1 };
        const createdPost = await PostsAPI.createPost(postData);
        expect(createdPost).toMatchObject({ id: 101, ...postData });
    });
});
