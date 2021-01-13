import { Injectable } from '@angular/core';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;

  constructor() { }

  getCart(): Cart {
    if(this.cart === undefined) {
        this.cart = {
            amount: 0,
            num_items: 0,
            items: []
        }
    }
    return this.cart;
  }

  setCart(updatedCart: Cart): void {
    this.cart = updatedCart;
  }
}
