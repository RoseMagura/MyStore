import { Product } from './product';

export interface Cart {
  amount: number;
  items: Product[];
  num_items: number;
}

export class MyCart implements Cart {
  amount: number;
  items: Product[];
  num_items: number;
  constructor(amount: number, items: Product[], num_items: number) {
    this.amount = amount;
    this.items = items;
    this.num_items = num_items;
  }
}
