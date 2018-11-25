interface LoginInput{
    username: string;
    password: string;
}

interface LoginOutput{
    token: string;
}

interface IUserService {
    loginUser(login: LoginInput): Promise<LoginOutput>;
}

export { IUserService, LoginInput, LoginOutput };