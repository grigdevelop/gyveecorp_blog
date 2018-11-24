import Article from "../entities/article";
import * as Joi from 'joi';

let articleScheme = Joi.object().keys({
    id: Joi.number().optional(),
    title: Joi.string().min(3).max(100).required(),
    desc: Joi.string().required(),
    authorId: Joi.number().required(),
    content: Joi.string().required(),
    datePublished: Joi.date().required()
});

let validateArticle = (article: Article) => {
    return Joi.validate(article, articleScheme);
};