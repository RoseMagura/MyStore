import { Product } from './product';

export interface Cart {
  amount: number;
  items: Product[];
  numItems: number;
}

export class MyCart implements Cart {
  amount: number;
  items: Product[];
  numItems: number;
  constructor(amount: number, items: Product[], numItems: number) {
    this.amount = amount;
    this.items = items;
    this.numItems = numItems;
  }
}
