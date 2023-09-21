export default class UserDto {
    constructor(user) {
        delete user.password;
        this.user = user;
    }
}