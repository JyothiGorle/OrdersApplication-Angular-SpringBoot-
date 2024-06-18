import { Component, OnInit } from '@angular/core';
import { Items } from '../classes/items';
import { FormGroup } from '@angular/forms';
import { ItemsService } from '../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-updateitems',
  templateUrl: './updateitems.component.html',
  styleUrls: ['./updateitems.component.css']
})
export class UpdateitemsComponent implements OnInit {

  items: Items[];
  addItemForm: FormGroup;
  constructor(private itemsservice: ItemsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private sharedService: SharedService) {
    this.addItemForm = this.fb.group({
      item: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
    })
  }
  id: number;
  orderid: number;
  itemid: number;
  itemname: string;
  quantity1: number;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.orderid = params['orderid'];
      this.itemid = params['itemid'];
      this.itemname = params['itemname'];
      this.quantity1 = params['quantity'];
      console.log(this.id, " ", this.orderid);
    })
    this.getItemsList();
  }
  private getItemsList() {
    this.itemsservice.getItems().subscribe(data => {
      this.items = data;
    })
  }
  item_id: number;
  quantity: number;
  fun(action: string): void {
    if (action === 'save') {
      this.markFormGroupTouched(this.addItemForm);
      if (this.addItemForm.valid) {
        const msg=window.confirm("Are you sure you want to update the exsting ones");
        if(msg)
          {
            this.item_id = this.addItemForm.get('item').value;
            this.quantity = this.addItemForm.get('quantity').value;
            // this.updateItems1();
            // this.router.navigate(['/edititems',this.orderid]);
            this.updateItems1().subscribe(() => {
              this.sharedService.notifyItemAdded();
              //this.router.navigate(['/edititems', this.orderid]);
              this.router.navigate(['/edititems']);
            });
          }
      }

    }
  }
  updateItems1(): Observable<any> {
    return this.itemsservice.updateItems(this.id, this.item_id, this.quantity);
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
