import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { Cart } from '../../cart';
import { CartService } from '../../cart.service';
import { Router } from "@angular/router";
import { Order } from 'src/app/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;

  checking_out: boolean = false;
  order: Order;

  constructor(
      private cartService: CartService,
      private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void{
    this.checking_out = true;
  }

  delete(product: Product): void{
    const updatedCart: Cart = this.cart;
    updatedCart.num_items--;
    updatedCart.items.splice(this.cart.items.indexOf(product), 1);
    updatedCart.amount -= product.price;
    this.cartService.setCart(updatedCart);
    alert(`You removed ${product.name} from the cart.`)
  }

  onSubmit(orderForm: Order): void {
      console.log(`submitted ${orderForm.name}, 
        ${orderForm.email}, ${orderForm.payment}`);
      this.router.navigate(['cart/success']);
  }
}
