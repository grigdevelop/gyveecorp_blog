import axios from 'axios';



describe("Article controller integration tests", async () => {      
    
    test('Should do something',async () => {
        let response = await axios.get('http://localhost:7777/articles/getArticles');            
        console.log("getArticles response is: ", response.data);
    });

});



