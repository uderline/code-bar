import {Routes} from '@angular/router';
import {Question1Component} from "./question1/question1.component";

export const routes: Routes = [
    {pathMatch: 'full', path: '', redirectTo: 'question1'},
    {path: 'question1', component: Question1Component},
];
