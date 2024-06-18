import { Items } from "./items";
import { Orders } from "./orders";

export class Order_Item {
    id:number;
    order:Orders;
    item:Items;
    quantity:number;
}
