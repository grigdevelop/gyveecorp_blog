import axios from 'axios';
import { testEnvironment } from './tools/serverTestUtil';

describe("Article controller integration tests", async () => {  

    beforeEach(() => {
        testEnvironment.localDbArranger.resetDb();
    });

    afterEach(() => {
        testEnvironment.localDbArranger.resetDb();
    });
       
    test('Should get articles',async () => {
        // expected article
        let article = {
            authorId: 1, 
            content: "lorem", 
            datePublished: 
            new Date(),
            desc: "about", 
            title: "some title", 
            id: 1
        };

        testEnvironment.localDbArranger.insert("articles", article);

        let response = await axios.get('http://localhost:7777/articles/getArticles');            
        console.log("getArticles response is: ", response.data);

        expect(response.data).not.toBeNull();
        expect(response.data.length).toBe(1);
        expect(response.data[0].authorId).toBe(article.authorId);
        expect(response.data[0].content).toBe(article.content);
        expect(new Date(response.data[0].datePublished).toString()).toBe(article.datePublished.toString());
        expect(response.data[0].desc).toBe(article.desc);
        expect(response.data[0].title).toBe(article.title);
    });

    test('Should do it again with only one',async () => {

        testEnvironment.getServiceLocator().articleService.createArticle({authorId: 1, content: "lorem", datePublished: new Date(), desc: "about", title: "some title", id: 0})
        let response = await axios.get('http://localhost:7777/articles/getArticles');            
        console.log("getArticles response after all is: ", response.data);
    });

});



