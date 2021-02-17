import { Injectable } from '@angular/core';
import { Cart, MyCart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new MyCart(0, [], 0);
  private dataUrl = 'http://localhost:3000/orders';
  private orderId: number;

  constructor(private http: HttpClient) {}

  getCart(): Cart {
    const userId = localStorage.getItem('userId');
    const order = this.http.get(`${this.dataUrl}/${userId}/joined`,           
    {
        withCredentials: true,
        headers: new HttpHeaders({
          'Set-Cookie': localStorage.getItem('token'),
        }),
      }).pipe(
          catchError((error) => {
              if(error.status === 401) {
                  alert('Token expired. Please log out and in again.');
              }
              console.error(error);
              return of();
          })
      );
      order
      .subscribe((response: any[]) => {
          if(!String(response).includes('not found')) {
          const orders = response.filter((order) => order.completed === false);
          const allItems = orders.filter((o) => o.order_id === orders[0].order_id);
          const productList: Product[] = [];
          let totalPrice = 0;
          allItems.forEach((item) =>
              this.http.get(`http://localhost:3000/products/${item.product_id}`)
                .subscribe((prodDetails: any[]) => {
                    console.log(prodDetails);
                    prodDetails.forEach(p => {
                        productList.push(p);
                        totalPrice += p.price;
                    });
                    // this.cart = 
                    // this.setCart(
                    return new MyCart(totalPrice, productList, allItems.length);
                    // );
                    console.log('inside', this.cart);
                })
         ); 
        }
        });
    console.log('outside', this.cart);
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
        .pipe(
            catchError((error) => {
                if(error.status === 401) {
                    alert('Token expired. Please log out and in again.');
                }
                console.error(error);
                return of();
            })
        )
        .subscribe((res) => {
          this.orderId = parseInt(res.toString().split('#')[1].split(' ')[0]);
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
