import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';

@Component({
    selector: 'header-index',
    templateUrl: './header.index.html',
    styleUrls: ['./header.index.css']
})

export class HeaderIndex{
    
    constructor(private _AuthService: AuthService){}
    
    private compose = false;
    
    categories: object[] = [{
        name: "Inbox",
        link: "inbox"
    },
    {
        name: "Sent Mail",
        link: "sentmail"
    },
    {
        name: "Important",
        link: "important"
    },
    {
        name: "Drafts",
        link: "drafts"
    },
    {
        name: "Trash",
        link: "trash"
    }];

    isLogged(){
        return this._AuthService.isLogged;
    }
    
    getUser(){
        return this._AuthService.getUserName();
    }
    
    getEmail(){
        return this._AuthService.getEmail();
    }
    
    onCompose(){
        return this.compose = !this.compose;
    }
    
    getCompose(){
        return this.compose;
    }
}