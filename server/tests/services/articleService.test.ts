import { testEnvironment } from "../tools/serverTestUtil";
import { Article } from "../../data/entities/article";


describe("article service tests", () => {

    const articleService = testEnvironment.getServiceLocator().articleService;

    beforeEach(() => {
        testEnvironment.localDbArranger.resetDb();
    });

    afterEach(() => {
        testEnvironment.localDbArranger.resetDb();
    });

    it('should create article', async () => {
        let article: Article = {
            title: "article title",
            desc: "article desc",
            content: "article content",
            datePublished: new Date(),
            authorId: 3
        };

        let result = await articleService.createArticle(article);

        expect(result.id).not.toBeUndefined();
    });

    it('should get article', async () => {
        let article: Article = {
            id: 10,
            title: "article title d",
            desc: "article desc ff",
            content: "article content fdf",
            datePublished: new Date(),
            authorId: 5
        };

        testEnvironment.localDbArranger.insert('articles', article);

        let articles = await articleService.getArticles();
        expect(articles.length).toBe(1);
        let resultArticle = articles[0];

        expect(resultArticle.id).toBe(article.id);
        expect(resultArticle.title).toBe(article.title);

    });

});