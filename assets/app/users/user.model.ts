export class User {
    constructor(public username?: string,
                public email: string,
                public password: string,
                public level?: string,
                public firstName?: string,
                public lastName?: string) {}
}