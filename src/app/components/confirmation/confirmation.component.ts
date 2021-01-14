import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private cartService: CartService) { }

  cart: Cart;
  
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  clearCart(): void { 
    this.cartService.emptyCart();
  }
}
