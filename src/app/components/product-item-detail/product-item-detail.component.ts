import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
    
  //initialize product with correct type
  product: Product;
  
  constructor(
      private route: ActivatedRoute,
      private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
      // get id from the url params
      const id = +this.route.snapshot.paramMap.get('id');
      // get all products and then select the index for the correct id
      this.productService.getProducts()
        .subscribe(products => this.product = products[id - 1]);
  }
}
