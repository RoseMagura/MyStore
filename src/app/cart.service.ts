import { Injectable } from '@angular/core';
import { Cart, MyCart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;

  constructor() { }

  getCart(): Cart {
    if(this.cart === undefined) {
        this.cart = new MyCart(0, [], 0);
    }
    return this.cart;
  }

  setCart(updatedCart: Cart): void {
    this.cart = updatedCart;
  }

  emptyCart(): void {
      this.cart = new MyCart(0, [], 0);
  }
}
