import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../users/auth.service"; 
import { Http, Headers, Response} from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Component({
    selector: 'sent-page',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.css']
})

export class SentComponent implements OnInit{
    constructor(private _AuthService: AuthService){}
    
    private emails: string = [];
    
    ngOnInit(){
        this.getSentMails();
    }
    
    getSentMails(){
        this._AuthService.getSentMails().subscribe(
            response => {
                this.emails = response.obj;
                console.log(response);   
            }, 
            error => console.log(error)
        );
    }
}