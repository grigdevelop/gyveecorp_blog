import { TestEnvironment } from "../setup/test.environment";
import IArticleService from "../../core/services/iArticle.service";
import * as assert from 'assert';
import { mockData } from "../setup";

describe('Should run article service tests', () => {

    const environment: TestEnvironment = new TestEnvironment();
    const articleService: IArticleService = environment.serviceLocator.articleService;

    beforeEach(() => {
        const db = environment.databaseProvider.localDb;
        db.setState(mockData);
        db.write();
    });

    it('should get articles',async () => {
        let articles = await articleService.getArticles();

        //expect(articles).not.toBeNull();
        //expect(articles.length).toBe(mockData.articles.length);
        assert.notEqual(articles, null);
        assert.equal(articles.length, mockData.articles.length);
    });

});