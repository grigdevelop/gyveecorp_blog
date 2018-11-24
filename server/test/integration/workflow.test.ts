import { TestServer } from "./../setup/test.server";
import { TestClient } from "./../setup/test.client";
import Article from "./../../domain/entities/article";
import { mockData } from "./../setup";
import * as assert from 'assert';
import { should } from 'chai';


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

    beforeEach(() => {
        server.setMockData();
    });

    it('should get articles', async () => {

        let result =  await client.get<Article[]>('article/getarticles');
        let articles : Article[] = result.data;
        //expect(articles.length).toBe(mockData.articles.length);
        assert.equal(articles.length, db_articles.length);
    });

    it('should create article', async () => {

        let article: Article = {
            title: 'm article',
            content: 'fff',
            datePublished: new Date(),
            authorId: 1,
            desc: "some desc"
        };

        let result = await client.post<Article>('article/createArticle', article);

        let responseArticle = result.data;

        should().equal(true, responseArticle.id > 0);
    });
})