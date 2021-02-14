import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Cart } from '../../interfaces/cart';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

export const checkCred = () => {
    if(localStorage.getItem('currentUser') === null) {
        location.pathname = '/login';
    }
}

export const logOut = () => {
    localStorage.removeItem('currentUser');
    location.pathname = '/login';
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  products: Product[];
  cart: Cart;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
    checkCred();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
  }

  addToCart(product: Product): void {
    const userId = localStorage.getItem('userId');
    this.cartService.addToCart(product, parseInt(userId));
    alert('Successfully added item to cart!');
  }
}
