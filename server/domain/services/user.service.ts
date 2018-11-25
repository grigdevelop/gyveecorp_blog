import { IUserService, LoginInput, LoginOutput } from "../../core/services";
import { User } from "../entities";
import { validateLoginInput } from "../validation/entity.validator";
import * as jwt from 'jsonwebtoken';
import { IAuthService } from "../../core/services/iAuth.service";
import { UnauthorizedError } from "../../core/http/errors";
import { VerifyErrors } from "jsonwebtoken";

class UserService implements IUserService, IAuthService {
    
    private users: User[] = [{
        id: 1,
        username: 'grigor',
        passwordHash: 'pas'
    }, {
        id: 2,
        username: 'vanand',
        passwordHash: 'pas'
    }];

    async loginUser(login: LoginInput): Promise<LoginOutput> {

        let result = await validateLoginInput(login);
        result.throwIfInvalid();

        let user = this.users.find(u => 
            u.username === login.username && 
            u.passwordHash === login.password);

        if(!user){
            throw new Error('Login faild. Username or password incorrect.');
        }
        
        const token = await jwt.sign(user, 'secret');

        return {
            token: token
        }
    }

    logout(): Promise<void> {
        return new Promise<void>(resolve => {
            this.currentUser = null;
            resolve();
        });
    }    


    private currentUser: User;

    checkAuthorized(): void {

        if(!this.currentUser){
            throw new UnauthorizedError('User not authorized');
        }        
        
    }
    isAuthorized(): boolean {

        if(this.currentUser){
            return true;
        }

        return false;
    }
    
    setAuthorized(token: string): Promise<void> {
        return new Promise<void>(resolve => {

            jwt.verify(token, 'secret', (err: VerifyErrors, authData: User) => {

                if( err ){
                    throw err;
                } else {
                    this.currentUser = authData;
                    resolve();
                }
            });

        });
    }

    getAuthorized(): User {
        return this.currentUser;
    }

}

export default UserService;