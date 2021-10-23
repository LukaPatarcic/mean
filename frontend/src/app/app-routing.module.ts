import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewComponentComponent} from "./new-component/new-component.component";

const routes: Routes = [
    { path: 'login', component: NewComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
