import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../user.model.ts';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-panel',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

    rgForm: FormGroup;

    constructor(private _AuthService: AuthService, private _router: Router){}

    onSubmit(){
        const user = new User(
            undefined,
            this.rgForm.value.email, 
            this.rgForm.value.password
        );

        this._AuthService.signin(user).subscribe(
            result => {
                localStorage.setItem('token', result.token);
                this._router.navigate(['/dashboard']);
                this._AuthService.isLogged = true;
                console.log(result);
            },
            error => console.log(error) 
        );

        console.log(user);

        this.rgForm.reset();
    }

    ngOnInit(){
        if(localStorage.getItem('token')){
            this._router.navigate(['/dashboard']);
        }

        this.rgForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}