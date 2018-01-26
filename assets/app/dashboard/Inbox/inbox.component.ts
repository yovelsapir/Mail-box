import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../users/auth.service"; 
import { Http, Headers, Response} from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Component({
    selector: 'inbox-page',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit{
    constructor(private _AuthService: AuthService){}

    private emails: string = [];

    ngOnInit(){
        this.getInboxMails();
    }

    getInboxMails(){
        this._AuthService.getSentMails().subscribe(
            response => {
                this.emails = response.obj;
                console.log(this.getLength("inbox"));
                console.log(response);   
            }, 
            error => console.log(error)
        );
    }

    getCategory(category){
        return this.emails.filter((value) => {
            return value.category == category;
        });    
    }

    getLength(category){
        return this.getCategory(category).length;
    }
    
    getCheckedMails(index){
        this.emails[index].checked = !this.emails[index].checked;
        
        console.log(this.getCheckedEmailsArray());
        
    }
    
    getCheckedEmailsArray(){
        const result = this.emails.filter((element) => 
            return element.checked == true;
        );
        return result;
    }
    
    checkedAll(flag){
        console.log(flag);
        this.emails.forEach((element) => {
            element.checked = flag;
        });
        console.log(this.emails);
    }
}