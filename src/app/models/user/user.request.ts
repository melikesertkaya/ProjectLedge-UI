export class UserRequest {
    public username: string;
    public password: string;
    public userType: number;

    constructor(
        username: string, 
        password: string, 
        userType: number) 
        {
        this.username = username;
        this.password = password;
        this.userType = userType;
    }
}
