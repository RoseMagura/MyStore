import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

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

  ngOnInit(): void {}

  clearCart(): void {
    this.cartService.emptyCart();
  }
}
