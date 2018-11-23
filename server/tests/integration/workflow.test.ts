import { TestServer } from "../setup/test.server";
import { TestClient } from "../setup/test.client";
import Article from "../../domain/entities/article";
import { mockData } from "../setup/mock.data";

describe('should run workflow tests', () => {

    const server = new TestServer();
    const client = new TestClient(server);

    beforeAll(async () => {
        await server.start();
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should get articles', async () => {
        let articles = await client.get<Article[]>('article/getarticles');
        expect(articles.length).toBe(mockData.articles.length);
    });
})