import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _http:Http) { }

  confirmationMsg:string="New Product added successfully";
  isSuccess:boolean=false;
  productObj:Object={};

  addNewProduct = function(product){
    this.productObj={
      "name":product.name,
      "color":product.color
    }

    this._http.post("http://localhost:5555/products",this.productObj)
    .subscribe((res:Response)=>this.isSuccess = true);
  }

  ngOnInit() {
  }

}
