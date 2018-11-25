import { User } from "../../domain/entities";
import { LoginInput, LoginOutput } from ".";

interface IAuthService {

    checkAuthorized():void;

    isAuthorized():boolean;

    setAuthorized(token: string): Promise<void>;

    getAuthorized():User;

    loginUser(login: LoginInput): Promise<LoginOutput>;

    logout():Promise<void>;
}

export { IAuthService };