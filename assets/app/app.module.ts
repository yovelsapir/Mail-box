import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from './users/auth.service';
import { HeaderIndex } from './headers/header.index';
import { InboxComponent } from './dashboard/Inbox/inbox.component';
import { SentComponent } from './dashboard/Sent/sent.component';
import { ComposeComponent } from './dashboard/compose/compose.component';

import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        HeaderIndex,
        InboxComponent,
        ComposeComponent,
        SentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})

export class AppModule {

}