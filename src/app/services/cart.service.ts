import { Injectable } from '@angular/core';
import { Cart, MyCart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart;
  private dataUrl = 'http://localhost:3000/orders';
  private orderId: number;

  constructor(private http: HttpClient) {}

  getCart(): Cart {
    if (this.cart === undefined) {
      this.cart = new MyCart(0, [], 0);
    }
    return this.cart;
  }

  setCart(updatedCart: Cart): void {
    this.cart = updatedCart;
  }

  addToCart(product: Product, id: number): Cart {
    const updatedCart: Cart = this.cart;
    updatedCart.numItems++;
    updatedCart.items.push(product);
    // Database is returning price as a string, so convert it here
    updatedCart.amount += Number(product.price);
    console.log(updatedCart);

    if (updatedCart.numItems === 1) {
        console.log('creating new order from scratch');
      // send request to backend to create order
      this.http
        .post(
          this.dataUrl,
          { userId: id, complete: false, products: [product] },
          {
            withCredentials: true,
            headers: new HttpHeaders({
              'Set-Cookie': localStorage.getItem('token'),
            }),
          }
        )
        .subscribe((res) => {
            console.log(res);
            this.orderId = parseInt(res.toString().split('#')[1].split(' ')[0]); 
        });
    } 
    else {
        console.log('updating', this.orderId);
        this.http.put(`${this.dataUrl}/${this.orderId}`, this.cart.items).subscribe(response => console.log(response));   
    }
    return this.cart;
  }

  removeFromCart(product: Product): Cart {
    this.cart.numItems--;
    this.cart.items.splice(this.cart.items.indexOf(product), 1);
    this.cart.amount -= Number(product.price);
    console.log('Editing order #', this.orderId);
    console.log(this.cart);
    // send request to backend to reduce numProducts from order
    const url = `${this.dataUrl}/${this.orderId}`;
    this.http.put(url, this.cart.items).subscribe(response => console.log(response));   
    // send request to backend to remove product from order_products table
    return this.cart;
  }

  emptyCart(): void {
    this.cart = new MyCart(0, [], 0);
  }
}
