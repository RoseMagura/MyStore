import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { Cart } from '../../interfaces/cart';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  // Initialize product and cart with correct type
  product: Product;
  cart: Cart;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getCart();
  }

  getProduct(): void {
    // get id from the url params
    const id = +this.route.snapshot.paramMap.get('id');
    // get all products and then select the index for the correct id
    this.productService
      .getProducts()
      .subscribe((products) => (this.product = products[id - 1]));
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
