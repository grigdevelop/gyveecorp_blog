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
    const database = server.getServerDatabase();

    before(async () => {
        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    beforeEach(() => {
        database.setState(mockData);
        database.write();
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


    it('should not create invalid article', async () => {
        let invalidArticle: any = {

        };

        let result = await client.post<Article>('article/createArticle', invalidArticle);

        should().equal(result.data, null);
        should().equal('ApiError', result.error.name);
        should().equal('ValidationError', result.error.error.name);
    });

    it('should get an article', async () => {
        let article = mockData.articles[0];
        
        let result = await client.get<Article>(`article/getArticle/${article.id}`);
        let resultArticle = result.data;

        should().equal(article.title, resultArticle.title);
        should().equal(article.id, resultArticle.id);
        should().equal(article.content, resultArticle.content);
        should().equal(article.desc, resultArticle.desc);
    });

    it('should delete article', async () => {
        // for sure add just one database
        const article: Article = mockData.articles[0];
        database.setState({articles: [article]});

        // should be one article in database
        let foundedArticles: Article[] = database.get('articles').value();
        should().equal(1, foundedArticles.length);

        // delete article by server call
        await client.post<void>('article/deleteArticle', {id: article.id});

        // check if any article exists in db after delete
        foundedArticles = database.get('articles').value();
        should().equal(0, foundedArticles.length);
    });
})