import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderIdService {

  constructor() { }
  private Id=new BehaviorSubject<number|null>(null);
  currentItemId$=this.Id.asObservable();

  setCurrentItemId(orderid:number)
  {
    this.Id.next(orderid);
  }
}
