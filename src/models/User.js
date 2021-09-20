export class User {
    id;
    username;
    password;
    profile_picture;
    created_at;
    updated_at;

    constructor(userData) {
        this.id = userData?.id;
        this.username = userData?.username;
        this.password = userData?.password;
        this.profile_picture = userData?.profile_picture;
        this.created_at = userData?.created_at;
        this.updated_at = userData?.updated_at;
    }
}