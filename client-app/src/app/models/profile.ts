import { User } from "./user";

export interface Profile {
    username: string;
    displayname: string;
    image?: string;
    bio?: string
}

export class Profile implements Profile{
    constructor(user: User){
        this.username = user.username;
        this.displayname = user.displayname;
        this.image = user.image;
    }
}