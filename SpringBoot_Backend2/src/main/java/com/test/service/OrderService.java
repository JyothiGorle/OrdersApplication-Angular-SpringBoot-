package com.test.service;

import java.util.List;

import com.test.model.Items;
import com.test.model.Order_Item;
import com.test.model.Orders;
import com.test.model.Ordersnew;

public interface OrderService {
	public List<Orders> getAllOrders();
	public List<Items> getAllItems();
	public void saveItems(Ordersnew orderItem);
	public List<Order_Item> getViewItemList();
	public List<Order_Item> getOrders(int orderid);
	public void savenewItems(Ordersnew orderItem);
	public void updateItems(int id, int item_id, int quantity);
	public void deleteItem(int id);
	public void deleteOrders(int orderid);
}
