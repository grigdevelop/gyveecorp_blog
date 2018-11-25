import IArticleRepository from "../repos/iArticle.repo";

interface IRepositoryLocator {
    readonly articleRepository: IArticleRepository;
}

export default IRepositoryLocator;