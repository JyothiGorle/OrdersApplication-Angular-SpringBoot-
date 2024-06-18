import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../classes/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseurl="http://localhost:8081/api/orders";
  constructor(private httpclient:HttpClient) { 
  }
  getOrderslist():Observable<any>{
    return this.httpclient.get<any>(this.baseurl);
  }
  deleteOrderList(orderid:number):Observable<any>{
    return this.httpclient.delete<any>(`http://localhost:8081/api/deleteorder/${orderid}`);
  }
}
