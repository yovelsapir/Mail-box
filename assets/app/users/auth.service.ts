import { Injectable } from "@angular/core";
import { Http, Headers, Response} from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from "./user.model";

@Injectable()
export class AuthService { 
    constructor(private http: Http){}

    public isLogged = false;
    private userName: string = null;
    private email: string = null;
    private compose = false;
    
    onCompose(){
        return this.compose = !this.compose;
    }

    getCompose(){
        return this.compose;
    }

    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())  
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    userIsLogged(){
        const token = localStorage.getItem("token");

        if(token){
            const headers = new Headers({'Content-Type': 'application/json'});

            return this.http.post("http://localhost:3000/dashboard", {
                token: token}, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
        }
    }

    getInboxMails(){
        return this.http.get("http://localhost:3000/dashboard/inbox").map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));  
    }

    
    saveEmail(data){
        const body = JSON.stringify(data);

        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/dashboard/inbox/compose', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logOut(){
        this.userName = null;
        this.email = null;
        this.isLogged = false;
        if(localStorage.getItem("token") != undefined){
            localStorage.removeItem("token");
        }
    }

    getUserName(){
        return this.userName;
    }

    getEmail(){
        return this.email;
    }
}