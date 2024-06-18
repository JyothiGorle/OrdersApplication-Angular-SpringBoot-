import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import {  ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdditemsComponent } from './additems/additems.component';
import { ViewitemsComponent } from './viewitems/viewitems.component';
import { EdititemsComponent } from './edititems/edititems.component';
import { AddnewitemsComponent } from './addnewitems/addnewitems.component';
import { UpdateitemsComponent } from './updateitems/updateitems.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderlistComponent,
    AdditemsComponent,
    ViewitemsComponent,
    EdititemsComponent,
    AddnewitemsComponent,
    UpdateitemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
