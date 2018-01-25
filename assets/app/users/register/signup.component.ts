import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Routes } from '@angular/routes';

@Component({
    selector: 'signup-panel',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class RegisterComponent implements OnInit{
    rgForm: FormGroup;

    constructor(private _AuthService: AuthService){}

    onSubmit(){
        const user = new User(
            this.rgForm.value.username,
            this.rgForm.value.email,
            this.rgForm.value.password,
            "Owner"
        );


        this._AuthService.signup(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
        );

        this.rgForm.reset();
    }

    ngOnInit(){
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            this._AuthService.logOut();
        }

        this.rgForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}