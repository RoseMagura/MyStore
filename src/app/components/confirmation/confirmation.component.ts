import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { checkCred } from '../product-list/product-list.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  @Input() name: string;
  @Input() completed: boolean;
  @Input() cart: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    checkCred();
  }

  clearCart(): void {
    this.cartService.emptyCart();
  }
}
