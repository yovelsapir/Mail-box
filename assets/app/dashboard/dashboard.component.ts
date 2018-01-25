import { Component, OnInit } from "@angular/core";
import { AuthService } from "../users/auth.service"; 
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit { 

    constructor(private _AuthService: AuthService, private _router: Router){}

    ngOnInit(){
        if(this._AuthService.userIsLogged() != undefined){
            this._AuthService.userIsLogged()
                .subscribe(
                result => {
                    console.log(result);
                    this._AuthService.isLogged = true;
                    this._AuthService.userName = result.username;
                    this._AuthService.email = result.email;
                },
                error => {
                    this._AuthService.logOut();
                    this._router.navigate(['/']);
                    console.log(error);
                }
            );   
        }else{
            this._AuthService.logOut();
            this._router.navigate(['/']);

        }
    }


}