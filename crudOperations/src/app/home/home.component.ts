import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products=[];
  constructor(private _http:Http) { }

  fetchData = function(){
    this._http.get("http://localhost:5555/products")
    .subscribe((res:Response)=> this.products=res.json());
  }

  ngOnInit() {
    this.fetchData();
  }

}
