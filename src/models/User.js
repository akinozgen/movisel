export class User {
    id;
    email;
    last_sign_in_at;
    phone;

    constructor(userData) {
        this.id = userData?.id;
        this.email = userData?.email;
        this.last_sign_in_at = userData?.last_sign_in_at;
        this.phone = userData?.phone;
    }
}