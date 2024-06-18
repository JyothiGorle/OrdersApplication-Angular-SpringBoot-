import { Component, OnInit } from '@angular/core';
import { Items } from '../classes/items';
import { ItemsService } from '../services/items.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SharedService} from  '../services/shared.service';
import { Observable } from 'rxjs';
import { CurrentOrderIdService } from '../services/current-order-id.service';


@Component({
  selector: 'app-addnewitems',
  templateUrl: './addnewitems.component.html',
  styleUrls: ['./addnewitems.component.css']
})
export class AddnewitemsComponent implements OnInit {
  items:Items[];
  addItemForm:FormGroup;
  orderid:number;
  constructor(private itemsservice:ItemsService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute,
    private sharedservice:SharedService,private currentorderidservice:CurrentOrderIdService ) {
    this.addItemForm=this.fb.group({
      item:['',Validators.required],
      quantity:['',[Validators.required,Validators.min(1),Validators.max(1000)]]
    })
   }
 
  ngOnInit() :void{
      // this.route.params.subscribe(params=>{
      //   this.orderid=params['orderid'];
      //   console.log(this.orderid);
      // })
      this.currentorderidservice.currentItemId$.subscribe(id=>this.orderid=id);
    this.getItemsList();
  }
  private getItemsList()
  {
    this.itemsservice.getItems().subscribe(data=>{
      this.items=data;
  })
  }
  item_id:number;
  quantity:number;
  fun(action:string) :void
  {
    if(action === 'save')
      {
        this.markFormGroupTouched(this.addItemForm);
        if(this.addItemForm.valid){
          this.item_id=this.addItemForm.get('item').value;
          this.quantity=this.addItemForm.get('quantity').value;
          this.saveItems2().subscribe(() => {
            this.sharedservice.notifyItemAdded();
           // this.router.navigate(['/edititems', this.orderid]);
            this.router.navigate(['/edititems']);
          });
        }
        else{
          console.log("form is invalid");
        }
       
      }
  }
  private saveItems2() :Observable<any>
  {
    return this.itemsservice.saveNewItems(this.orderid, this.item_id, this.quantity);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
