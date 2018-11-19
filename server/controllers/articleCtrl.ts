import { Article } from "../data/entities/article";
import { BaseCtrl } from "./baseCtrl";

class ArticleCtrl extends BaseCtrl{
 
    
   getArticles(){
      return this.serviceLocator.articleService.getArticles();
   }

   createArticle(article: Article){
      return this.serviceLocator.articleService.createArticle(article);
   }

   getLastArticles(){
      return this.serviceLocator.articleService.getArticles(2);
   }


   configureActions() {
      this.actionRoutes.addAction('get','getArticles', this.getArticles);
      this.actionRoutes.addAction('get','getLastArticles', this.getLastArticles);
      this.actionRoutes.addAction('post','createArticle', this.createArticle);
      return 'articles';
   }
}

export { ArticleCtrl };