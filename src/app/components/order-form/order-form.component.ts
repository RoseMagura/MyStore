import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/order';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() options: string[];
  @Input() order: Order;

  @Output() customerNameEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(orderForm: Order): void {
    // console.log(`submitted ${orderForm.name}, 
    //   ${orderForm.email}, ${orderForm.payment}`);
    this.customerNameEvent.emit(orderForm.name);
}

}
