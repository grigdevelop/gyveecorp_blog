import { TestEnvironment } from "../setup/test.environment";
import IArticleService from "../../core/services/iArticle.service";
import * as assert from 'assert';
import { mockData } from "../setup";
import Article from "../../domain/entities/article";
import { should } from "chai";
import { ValidationError } from "../../core/http/validation.error";

describe('Should run article service tests', () => {

    const environment: TestEnvironment = new TestEnvironment();
    const articleService: IArticleService = environment.serviceLocator.articleService;
    const localDb = environment.databaseProvider.localDb;

    beforeEach(() => {
        localDb.setState(mockData);
        localDb.write();
    });

    describe('articleService.getArticles', () => {

        it('should get articles',async () => {
            let articles = await articleService.getArticles();
    
            //expect(articles).not.toBeNull();
            //expect(articles.length).toBe(mockData.articles.length);
            assert.notEqual(articles, null);
            assert.equal(articles.length, mockData.articles.length);
        });

    });


    describe('articleService.createArticle', () => {

        it('should create article', async () => {
            let article: Article = {
                title: 'm title',
                authorId: 1,
                content: 'm content',
                datePublished: new Date(),
                desc: 'm desc',        
            };
            article = await articleService.createArticle(article);
    
            should().equal(true, article.id > 0);
        });
    
        it('should not create invalid article', async () => {
            let article: any = {};
            
            try{
                article = await articleService.createArticle(article);
                should().fail(true, true);
            }catch(error){
                let validationError: ValidationError = error;
                should().equal(validationError.result.hasErrors, true);
            }        
        });

    });

    describe('articleService.updateArticle', () => {

        it('should update article', async () => {

            let article: Article = mockData.articles[0];
            article.title = 'fully unique title';
            article = await articleService.updateArticle(article);

            let updatedArticle : Article = localDb.get('articles')
                .find({id: article.id})
                .value();

            should().equal(article.title, updatedArticle.title);

        })

    });
    

    

});