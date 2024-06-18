import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order_Item } from '../classes/Order_Item';
import { Items } from '../classes/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseurl="http://localhost:8081/api/items";
  private baseurl1="http://localhost:8081/api/additems";
  private viewitemsurl="http://localhost:8081/api/viewitems";
  private saveitemsurl="http://localhost:8081/api/addnewitems";
  private updateitemsurl="http://localhost:8081/api/updateitems";
  private deleteitemsurl="http://localhost:8081/api/deleteitem";
  constructor(private httpclient:HttpClient) { }
  getItems():Observable<any>{
    return this.httpclient.get<any>(this.baseurl);
  }

  saveItems(item_id:number,quantity:number):Observable<any>{
    const body={item_id,quantity}
    console.log(item_id," ",quantity);
    return this.httpclient.post<any>(this.baseurl1,body);
  }
  getViewItemsList():Observable<any>{
    return this.httpclient.get<any>(this.viewitemsurl);
  }
  getEditItemsList(id:number):Observable<any>{
    return this.httpclient.get<any>(`http://localhost:8081/api/editorder/${id}`);
  }
  saveNewItems(order_id:number,item_id:number,quantity:number):Observable<any>{
    const body={order_id,item_id,quantity}
    console.log(order_id," ",item_id," ",quantity);
    return this.httpclient.post<any>(this.saveitemsurl,body);
  }
  updateItems(id:number,item_id:number,quantity:number):Observable<any>{
    const body={id,item_id,quantity};
    console.log(id," ",item_id," ",quantity);
    return this.httpclient.post<any>(this.updateitemsurl,body);
  }
  deleteItems(id:number):Observable<any>{
    return this.httpclient.delete<any>(`http://localhost:8081/api/deleteitem/${id}`);
  }
}
