import { IServiceLocator } from "../../core/locators";
import { ArticleController } from "../../controllers";

class ControllerLocator {

    public readonly articleController: ArticleController;

    constructor(serviceLocator: IServiceLocator){
        this.articleController = new ArticleController(serviceLocator.articleService);
    }

}

export default ControllerLocator;