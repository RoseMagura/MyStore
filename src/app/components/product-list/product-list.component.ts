import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Cart } from '../../interfaces/cart';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

export const checkCred = () => {
    // console.log(localStorage.getItem('currentUser') === null);
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
    const updatedCart: Cart = this.cart;
    updatedCart.numItems++;
    updatedCart.items.push(product);
    updatedCart.amount += product.price;
    this.cartService.setCart(updatedCart);
    alert('Successfully added item to cart!');
  }
}
