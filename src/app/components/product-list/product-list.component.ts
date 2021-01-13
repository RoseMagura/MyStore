import { Component, OnInit } from '@angular/core';
import { Product } from '../../product'; 
import { Cart } from '../../cart';
import { ProductService } from '../../product.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  cart: Cart;

  constructor(
      private productService: ProductService,
      private cartService: CartService
    ) { }

  ngOnInit(): void {
      this.getProducts();
      this.getCart();
  }

  getProducts(): void {
      this.productService.getProducts()
        .subscribe(products => this.products = products);
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
