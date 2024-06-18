import { Component, OnInit } from '@angular/core';
import { Items } from '../classes/items';
import { ItemsService } from '../services/items.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Order_Item } from '../classes/Order_Item';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
export class AdditemsComponent implements OnInit {
  items: Items[];
  addItemForm: FormGroup;
  OrderItemList:Order_Item[];

  constructor(private itemsservice: ItemsService, private fb: FormBuilder, private router: Router) {
    this.addItemForm = this.fb.group({
      item: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
    });
  }

  ngOnInit() {
    this.getItemsList();
  }

  private getItemsList() {
    this.itemsservice.getItems().subscribe(data => {
      this.items = data;
    });
  }

  item_id: number;
  quantity: number;

  fun(action: String): void {
    if (action === 'save') {
      
      // Marking  all form controls as touched to trigger validation errors
      this.markFormGroupTouched(this.addItemForm);

      if (this.addItemForm.valid) {
        this.item_id = this.addItemForm.get('item').value;
        this.quantity = this.addItemForm.get('quantity').value;
        this.saveItems1();
        console.log("Items are being saved");
        // setTimeout(()=>{
        //   this.router.navigate(['/viewitems']);
        // },500)
      } else {
        console.log("Form is invalid");
      }
    } else if (action === 'cancel') {
      this.router.navigate(['/orders']);
    }
  }

  private saveItems1() {
    this.itemsservice.saveItems(this.item_id, this.quantity).subscribe(data => {
      console.log("Hello", data);
      this.router.navigate(['/viewitems']);
    });
  }



  // Function to mark all form controls as touched(Iterating over every form)

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
