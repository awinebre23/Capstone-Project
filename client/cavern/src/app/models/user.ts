export class User {
    id: number;
    name: string;
    role: string;
    username: string;
    password: string;

    constructor(id, name, role, username, password) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.username = username;
        this.password = password;
    }
}
