import { Article } from "../data/entities/article";
import { BaseCtrl } from "./baseCtrl";

class ArticleCtrl extends BaseCtrl{
 
    
   getArticles(){

      return [{id: 1, name: 'my name'}, {id: 2, name: 'your name'}];
   }

   createArticle(article: Article){
      return this.serviceLocator.articleService.createArticle(article);
   }

   getLastArticles(){
      return {name: 'gugush'};
   }


   configureActions() {
      this.actionRoutes.addAction('get','getArticles', this.getArticles);
      this.actionRoutes.addAction('get','getLastArticles', this.getLastArticles);
      this.actionRoutes.addAction('post','createArticle', this.createArticle);
      return 'articles';
   }
}

export { ArticleCtrl };