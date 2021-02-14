import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { Order } from '../../interfaces/order';
import { checkCred, logOut } from '../product-list/product-list.component';

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
    checkCred();
    this.getCart();
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void {
    this.checkingOut = true;
  }

  delete(product: Product): void {
    this.cartService.removeFromCart(product);
    alert(`You removed ${product.name} from the cart.`);
  }

  getName(name: string): void {
    this.customerName = name;
    this.checkingOut = false;
    this.checkoutCompleted = true;
  }
}
