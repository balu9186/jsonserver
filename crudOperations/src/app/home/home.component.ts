import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id:number;
  products=[];
  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private _http:Http) { }

  fetchData = function(){
    this._http.get("http://localhost:5555/products")
    .subscribe((res:Response)=> this.products=res.json());
  }

  ngOnInit() {
    this.fetchData();
  }

  deleteProduct = function(id){
    if(confirm("Are you sure do you want to delete?")){
      const url = `${"http://localhost:5555/products"}/${id}`;

      return this._http.delete(url,{headers:this.headers}).toPromise()
      .then(()=>
        {
          this.fetchData();
        })
    }
  }

}
