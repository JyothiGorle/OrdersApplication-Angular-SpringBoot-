import { Component, OnInit } from '@angular/core';
import { Orders } from '../classes/orders';
import {OrderService} from '../services/order.service'
import { Router } from '@angular/router';
import {CurrentOrderIdService } from '../services/current-order-id.service'
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orders:Orders[]
  constructor(private orderservice:OrderService,private router:Router,private currentorderidservice:CurrentOrderIdService ) { }

  ngOnInit() {
    this.getOrders();
  }
  private getOrders()
  {
    this.orderservice.getOrderslist().subscribe(data=>{
      this.orders=data;
    });
  }
  addOrder()
  {
    console.log("button is clicked");
    this.router.navigate(['/addorder']);
  }
  onEdit(orderid:number)
  {
    this.currentorderidservice.setCurrentItemId(orderid);
    this.router.navigate(['/edititems']);
  }
  deleteOrder(orderId: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      this.orderservice.deleteOrderList(orderId).subscribe(() => {
        this.orders = this.orders.filter(order => order.order_id !== orderId);
      });
    }
  }
}
