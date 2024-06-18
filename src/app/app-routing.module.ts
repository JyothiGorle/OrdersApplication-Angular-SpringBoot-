import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditemsComponent } from './additems/additems.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ViewitemsComponent } from './viewitems/viewitems.component';
import { EdititemsComponent } from './edititems/edititems.component';
import { AddnewitemsComponent } from './addnewitems/addnewitems.component';
import { UpdateitemsComponent } from './updateitems/updateitems.component';

const routes: Routes = [
  {path:'orders',component:OrderlistComponent },
  {path:'',redirectTo:'orders',pathMatch:'full'},
  {path:'addorder', component:AdditemsComponent},
  {path:'viewitems',component:ViewitemsComponent},
  //{path:'edititems/:order_id',component:EdititemsComponent,pathMatch:'full'},
  {path:'edititems',component:EdititemsComponent,pathMatch:'full'},
  //{path:'addnewitem/:orderid',component:AddnewitemsComponent},
  {path:'addnewitem',component:AddnewitemsComponent},
  {path:'updateitem/:id/:orderid/:itemid/:itemname/:quantity',component:UpdateitemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
