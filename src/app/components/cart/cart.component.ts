import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { Cart } from '../../cart';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void{
    console.log('checking out');
  }

  delete(product: Product): void{
    const updatedCart: Cart = this.cart;
    updatedCart.num_items--;
    updatedCart.items.splice(this.cart.items.indexOf(product), 1);
    updatedCart.amount -= product.price;
    this.cartService.setCart(updatedCart);
    alert(`You removed ${product.name} from the cart.`)
  }
}
