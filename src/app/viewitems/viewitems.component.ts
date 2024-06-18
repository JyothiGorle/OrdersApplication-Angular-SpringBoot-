import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Order_Item } from '../classes/Order_Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewitems',
  templateUrl: './viewitems.component.html',
  styleUrls: ['./viewitems.component.css']
})
export class ViewitemsComponent implements OnInit {

  constructor(private itemservice:ItemsService,private route:Router ) { }
  OrderItemList:Order_Item[];
  ngOnInit() {
    console.log("jyyyyyyyyyyyy");
    this.getOrderItemList();
  }
  private getOrderItemList()
  {
    this.itemservice.getViewItemsList().subscribe(data=>{
      console.log("itemlist:",data);
      this.OrderItemList=data;
    })
  }
  onBack()
  {
    this.route.navigate(["/orders"]);
   }
  
}
