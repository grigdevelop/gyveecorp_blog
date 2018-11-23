import Article from "../../domain/entities/article";

class MockData{
    public articles: Article[] = [
        {
            id :1,
            title : 'my article',
            desc :'some desc',
            content : 'lorem ipsum dolor sit',
            datePublished: new Date(),
            authorId: 1
        },
        {
            id :2,
            title : 'my article 1',
            desc :'some desc 1',
            content : 'lorem ipsum dolor sit 1',
            datePublished: new Date(),
            authorId: 1
        },
        {
            id :3,
            title : 'my article 2',
            desc :'some desc 2',
            content : 'lorem ipsum dolor sit 2',
            datePublished: new Date(),
            authorId: 1
        },
    ];
}

let mockData = new MockData();

export { mockData };