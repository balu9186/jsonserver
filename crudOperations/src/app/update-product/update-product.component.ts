import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object={};
  products=[];
  productObj:object={};
  headers = new Headers({'Content-Type':'application/json'});
  exists=false;

  constructor(private _router:Router, private _route:ActivatedRoute, private _http:Http) { }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      this.id = +params['id'];
    });

    this._http.get("http://localhost:5555/products")
    .subscribe((res:Response)=>{
      this.products = res.json();
      for(let i=0;i<this.products.length;i++){
        if(parseInt(this.products[i].id) === this.id){
          this.exists=true;
          this.data = this.products[i];
          break;
        }
        else{
          this.exists=false;
        }
      }
    });
  }

  updateProduct = function(product){
    this.productObj = {
      "name":product.name,
      "color":product.color
    };

    const url = `${"http://localhost:5555/products"}/${this.id}`;

     this._http.put(url,JSON.stringify(this.productObj),{headers:this.headers})
     .toPromise()
     .then(()=>{
       this._router.navigate(['/']);
     });
  }

}
