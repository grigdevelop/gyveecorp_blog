import { TestServer } from "./../setup/test.server";
import { TestClient } from "./../setup/test.client";
import Article from "./../../domain/entities/article";
import { mockData } from "./../setup";
import * as assert from 'assert';


describe('should run workflow tests', () => {

    const server = new TestServer();
    const client = new TestClient(server);
    const db_articles = mockData.articles;// for debugging

    before(async () => {
        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('should get articles', async () => {
        let articles = await client.get<Article[]>('article/getarticles');

        //expect(articles.length).toBe(mockData.articles.length);
        assert.equal(articles.length, db_articles.length);
    });
})