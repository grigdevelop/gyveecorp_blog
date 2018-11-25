import { mockData } from "../setup";
import { validateArticle } from "../../domain/validation/entity.validator";
import { should } from 'chai';

describe('entity.validator.ts', () => {

    describe('entity.Article', () => {

        it('should be valid article', async () => {
            let article = mockData.articles[0];
           
            let result = await validateArticle(article);
            should().not.equal(result, null);
            should().equal(result.hasErrors, false);                                     
        });

        it('should notify about all invalid fields', async () => {
            let invalidArticle: any = {};
            
            let result = await validateArticle(invalidArticle);           

            should().equal(result.hasErrors, true);
            should().not.equal(result.fieldsValidationResult['content'], undefined);
            should().not.equal(result.fieldsValidationResult['title'], undefined);
            should().not.equal(result.fieldsValidationResult['desc'], undefined);
            should().not.equal(result.fieldsValidationResult['datePublished'], undefined);
            should().not.equal(result.fieldsValidationResult['authorId'], undefined);

            // id is not required
            should().equal(result.fieldsValidationResult['id'], undefined);
        })

        it('shoud validate article wrong valeus', async () => {
            let invalidArticle: any = {};

            // enter invalid id and check
            invalidArticle['id'] = 'gg';
            let result = await validateArticle(invalidArticle);
            should().equal(result.hasErrors, true);
            should().not.equal(result.fieldsValidationResult['id'], undefined);

            // enter number in content
            invalidArticle['content'] = 11;
            result = await validateArticle(invalidArticle);
            should().not.equal(result.fieldsValidationResult['content'], undefined);
        });

    });

   


});