import { Product } from './product';

export interface Cart {
    amount: number,
    items: Product[],
    num_items: number
}