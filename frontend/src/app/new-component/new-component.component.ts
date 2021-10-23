import { Component, OnInit } from '@angular/core';
import {DataService} from "../dataService";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent implements OnInit {

    todos: any = [];
    constructor(private readonly _dataService: DataService) {
        this._dataService.Get(environment.url+"/todos").subscribe((data: {}) => {
            console.log(data);
            this.todos = data;
        });

    }

    onClick(): void {
        console.log('here')
    }

  ngOnInit(): void {
  }

}
