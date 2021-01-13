import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { CartService } from '../../cart.service';
import { Product } from '../../product';
import { Cart } from '../../cart';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  //initialize product and cart with correct type
  product: Product;
  cart: Cart;
  
  constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getCart();
  }

  getProduct(): void {
      // get id from the url params
      const id = +this.route.snapshot.paramMap.get('id');
      // get all products and then select the index for the correct id
      this.productService.getProducts()
        .subscribe(products => this.product = products[id - 1]);
  }

  getCart(): void {
      this.cart = this.cartService.getCart();
  }

  addToCart(product: Product): void {
    const updatedCart: Cart = this.cart;
    updatedCart.num_items++;
    updatedCart.items.push(product.name);
    updatedCart.amount += product.price;
    this.cartService.setCart(updatedCart);
  }
}
