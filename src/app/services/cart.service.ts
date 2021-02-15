import { Injectable } from '@angular/core';
import { Cart, MyCart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart;
  private dataUrl = 'http://localhost:3000/orders';
  private orderId: number;

  constructor(private http: HttpClient) {}

  getCart(): Cart {
    const userId = localStorage.getItem('userId');
    this.http.get(`${this.dataUrl}/${userId}`,           {
        withCredentials: true,
        headers: new HttpHeaders({
          'Set-Cookie': localStorage.getItem('token'),
        }),
      }).subscribe((response: any[]) => {
          if(!String(response).includes('not found')) {
          const currOrder = response.filter((order) => order.completed === false);
          console.log(currOrder);
        //   this.cart = new MyCart(0, [], currOrder.numItems);
        }
        });
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
    if (updatedCart.numItems === 1) {
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
          console.log('res', res);
          this.orderId = parseInt(res.toString().split('#')[1].split(' ')[0]);
          console.log('set order id');
        });
    } else {
      console.log(this.orderId);
        if(this.orderId !== undefined) {
            this.http
            .put(
              `${this.dataUrl}/${this.orderId}?action=add`,
              { numProducts: this.cart.numItems, toAdd: product['product_id'] },
              {
                withCredentials: true,
                headers: new HttpHeaders({
                  'Set-Cookie': localStorage.getItem('token'),
                }),
              }
            )
            .subscribe((response) => console.log(response));
        } else {
            alert('Try again -- Page not ready');
        }
    }
    return this.cart;
  }

  removeFromCart(product: Product): Cart {
    this.cart.numItems--;
    this.cart.items.splice(this.cart.items.indexOf(product), 1);
    this.cart.amount -= Number(product.price);
    // send request to backend to edit order
    const url = `${this.dataUrl}/${this.orderId}?action=remove`;
    this.http
      .put(
        url,
        { numProducts: this.cart.numItems, toDelete: product['product_id'] },
        {
          withCredentials: true,
          headers: new HttpHeaders({
            'Set-Cookie': localStorage.getItem('token'),
          }),
        }
      )
      .subscribe((response) => console.log(response));
    return this.cart;
  }

  emptyCart(): void {
    this.cart = new MyCart(0, [], 0);
  }

  checkout(): void {
    const url = `${this.dataUrl}/checkout/${this.orderId}`;
    this.http.put(url, {}).subscribe((response) => console.log(response));
  }
}
