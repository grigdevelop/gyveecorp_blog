import { IUserService, LoginInput, LoginOutput } from "../core/services";

class AuthController{

    constructor(private readonly userService: IUserService){

    }

    login(login: LoginInput): Promise<LoginOutput>{
        return this.userService.loginUser(login);
    }
}

export {AuthController};