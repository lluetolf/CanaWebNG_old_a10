export class User {
    username: string
    password: string
    token?: string

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
