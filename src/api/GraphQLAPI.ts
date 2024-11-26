import { gql, request } from 'graphql-request';

export class GraphQLAPI {
    private static BASE_URL = 'https://rickandmortyapi.com/graphql';

    static async getEpisodesWithRick(): Promise<{ id: string; name: string }[]> {
        const query = gql`
      query {
        episodes(filter: { name: "Rick" }) {
          results {
            id
            name
          }
        }
      }
    `;
        const data: any = await request(this.BASE_URL, query);
        if (data.episodes.results instanceof Array) return data.episodes.results;
        throw new Error('Unexpected response format');
    }
}
