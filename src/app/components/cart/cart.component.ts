import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart;

  checkingOut = false;

  order: Order = {
    name: '',
    email: '',
    payment: '',
  };

  options: string[] = ['Credit Card', 'Google Wallet', 'Apple Pay'];
  checkoutCompleted = false;
  customerName: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void {
    this.checkingOut = true;
  }

  delete(product: Product): void {
    const updatedCart: Cart = this.cart;
    updatedCart.numItems--;
    updatedCart.items.splice(this.cart.items.indexOf(product), 1);
    updatedCart.amount -= product.price;
    this.cartService.setCart(updatedCart);
    alert(`You removed ${product.name} from the cart.`);
  }

  getName(name: string): void {
    this.customerName = name;
    this.checkingOut = false;
    this.checkoutCompleted = true;
  }
}
