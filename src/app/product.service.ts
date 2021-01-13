import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataUrl = 'http://localhost:4200/assets/data.json'

  constructor(private http: HttpClient) { }

//   getProduct(id: number): Observable<Product> {
//     const all = this.http.get<Product[]>(this.dataUrl);
//     // return all.map(all => all.filter(item => item.id === id));
//     console.log(all);
//     return all[0];
//   }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }
}
