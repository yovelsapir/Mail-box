import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../users/auth.service"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'compose-selector',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.css']
})

export class ComposeComponent implements OnInit{

    constructor(private _AuthService: AuthService){}

    composeForm: FormGroup;

    onSubmit(){
        const data = {
            sender: this.composeForm.value.email,
            subject: this.composeForm.value.subject,
            message: this.composeForm.value.message,
            token: localStorage.getItem("token")
        }

        this._AuthService.saveEmail(data).subscribe(
            response => console.log(response), 
            error => console.log(error)
        );

        console.log(data);
        this.composeForm.reset();
    }

    ngOnInit(){
        this.composeForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            subject: new FormControl(null, [Validators.required]),
            message: new FormControl(null, [Validators.required])
        });
    }
}