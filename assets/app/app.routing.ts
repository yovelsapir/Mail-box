import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderIndexComponent } from "./headers/header.index";
import { InboxComponent } from "./dashboard/Inbox/inbox.component";
import { SentComponent } from "./dashboard/Sent/sent.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signup', component: RegisterComponent },
    { path: 'signin', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, 
        children: [
            {path: '', redirectTo: '/dashboard/inbox', pathMatch: 'full' }, 
            {path: 'inbox', component: InboxComponent },
            {path: 'sentmail', component: SentComponent }
        ]
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);