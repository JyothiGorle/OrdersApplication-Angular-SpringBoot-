import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n';
import { Order_Item } from '../classes/Order_Item';
import { SharedService } from '../services/shared.service';
import { CurrentOrderIdService } from '../services/current-order-id.service';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-edititems',
  templateUrl: './edititems.component.html',
  styleUrls: ['./edititems.component.css']
})
export class EdititemsComponent implements OnInit {

  constructor(private router:Router,private itemservice:ItemsService,private route:ActivatedRoute,private changeDetector:ChangeDetectorRef
    ,private sharedService:SharedService,private currentorderidservice:CurrentOrderIdService,private orderService:OrderService) { }
  orderid:number;
  EditItemsList:Order_Item[];
  totalcartprice:any;
  ngOnInit():void {
    // this.route.params.subscribe(params=>{
    //   this.orderid=params['order_id'];
    //   console.log(this.orderid);
    // })
    this.currentorderidservice.currentItemId$.subscribe(id=>{
      this.orderid=id
  });
    this.getEditItemsList1(this.orderid);

    // this.currentorderidservice.currentItemId$.subscribe(id=>this.orderid=id);
    // this.getEditItemsList1(this.orderid);

  this.sharedService.itemAdded$.subscribe(() => {
    this.getEditItemsList1(this.orderid);
  });
}

  private getEditItemsList1(orderid:number)
  {
    this.itemservice.getEditItemsList(orderid).subscribe(data=>{
      console.log("in edititems",data);
      this.EditItemsList=data;
      console.log("*****",this.totalcartprice);
      this.totalcartprice=this.EditItemsList.reduce((total,item)=>total + item.quantity*Number(item.item.item_price),0);
      console.log("&&&&&",this.totalcartprice);
      this.changeDetector.detectChanges();
    })
  }
  onAddItem()
  {
    this.router.navigate(['/addnewitem']);
  }
  onBack()
  {
    this.router.navigate(['/orders']);
  }
  id:number;
 private deleteItems1(id: number, order_id: number) {
  const isLastItem = this.EditItemsList.length === 1;

  const msg = isLastItem
    ? "This is the last item in the order. Deleting it will also delete the order. Are you sure you want to proceed?"
    : "Are you sure you want to delete this item?";

  const confirmDeletion = window.confirm(msg);
  
  if (confirmDeletion) {
    this.itemservice.deleteItems(id).subscribe(data => {
      console.log(data);
      if (isLastItem) {
        this.orderService.deleteOrderList(order_id).subscribe(() => {
          this.router.navigate(['/orders']);
        });
      } else {
        this.getEditItemsList1(order_id);
      }
    });
  }
}

}
