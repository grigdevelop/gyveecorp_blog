import { Article } from "../data/entities/article";
import { BaseCtrl } from "./baseCtrl";
import { HttpMethod } from "../infra/httpMethods";

class ArticleCtrl extends BaseCtrl{
 
    
   getArticles(): Promise<Article[]>{
      console.log("trying to get articles");
      return this.serviceLocator.articleService.getArticles();
   }

   createArticle(article: Article): Promise<Article>{
      return this.serviceLocator.articleService.createArticle(article);
   }

   getLastArticles(): Promise<Article[]>{
      return this.serviceLocator.articleService.getArticles(2);
   }


   configureActions() {
      this.actionRoutes.addAction(HttpMethod.GET,'getArticles', this.getArticles);
      this.actionRoutes.addAction(HttpMethod.GET,'getLastArticles', this.getLastArticles);
      this.actionRoutes.addAction(HttpMethod.POST,'createArticle', this.createArticle);
      return 'articles';
   }
}

export { ArticleCtrl };