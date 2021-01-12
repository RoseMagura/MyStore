import { Component, OnInit } from '@angular/core';
import { Product } from '../../product'; 
import * as data from '../../../assets/data.json';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

//   products: Product[] = Array.of(data);
products: Product[] = data.default;
  constructor() { }

  ngOnInit(): void {
    //   console.log(this.products);
  }

}
