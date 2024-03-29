export default class UserDto {
    constructor(userObject, usersArray) {
        if (!userObject && !usersArray) {
            return null;
        } else if (!userObject && usersArray.length !== 0) {
            this.users = usersArray.map((user) => {
                return {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role: user.role
                }
            });
        } else if (userObject) {
            this.name = `${userObject.first_name} ${userObject.last_name}`;
            this.email = userObject.email;
            this.role = userObject.role;
        }
    }
}