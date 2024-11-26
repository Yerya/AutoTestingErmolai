import { describe, it, expect } from 'vitest';
import { GraphQLAPI } from '../src/api/GraphQLAPI';

describe('GraphQLAPI', () => {
    it('should fetch episodes containing "Rick" in the name', async () => {
        const episodes = await GraphQLAPI.getEpisodesWithRick();
        expect(episodes.length).toBeGreaterThan(0);
        episodes.forEach((episode) => {
            expect(episode.name.toLowerCase()).toContain('rick');
        });
    });
});
