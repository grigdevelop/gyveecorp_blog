import IRepositoryLocator from "../../core/locators/iRepo.locator";
import IArticleRepository from "../../core/repos/iArticle.repo";
import IDatabaseProvider from "../../core/providers/iDatabase.provider";
import ArticleSqlRepoistory from "../repos/article.sql.repo";
import ArticleLocalRepository from "../repos/article.local.repo";

class RepositoryLocator implements IRepositoryLocator{
    public readonly articleRepository : IArticleRepository;

    constructor(databaseProvider: IDatabaseProvider){

        let database = databaseProvider.createDatabase();

        if(databaseProvider.dbType === 'sql'){
            this.articleRepository = new ArticleSqlRepoistory(database);
            return;
        }

        if(databaseProvider.dbType === 'local'){
            this.articleRepository = new ArticleLocalRepository(database);
            return;
        }
    }
}

export default RepositoryLocator;