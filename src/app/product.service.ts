import { Injectable } from '@angular/core';
import { Product } from './product';
import * as data from '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(id: number): Product {
    return (data as any).default[id];
  }

  getProducts(): Product[] {
    return (data as any).default;
  }
}
