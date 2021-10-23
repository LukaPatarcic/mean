import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataService} from "./dataService";
import {HttpClientModule} from "@angular/common/http";
import { NewComponentComponent } from './new-component/new-component.component';

@NgModule({
    declarations: [
        AppComponent,
        NewComponentComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
