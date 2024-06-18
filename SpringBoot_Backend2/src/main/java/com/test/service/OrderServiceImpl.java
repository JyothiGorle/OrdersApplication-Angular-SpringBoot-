package com.test.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dao.ItemsRepository;
import com.test.dao.OrderItemRepository;
import com.test.dao.OrdersRepository;
import com.test.model.Items;
import com.test.model.Order_Item;
import com.test.model.Orders;
import com.test.model.Ordersnew;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	private OrdersRepository orderrepository;
	
	@Autowired
	private ItemsRepository itemrepository;
	
	@Autowired
	private OrderItemRepository orderitemrepository;
	
	public List<Orders> getAllOrders()
	{	List<Orders>list=null;
		try {
			list=(List<Orders>) orderrepository.findAll();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}
	
	public List<Items> getAllItems()
	{
		List<Items>list=null;
		try {
			list=(List<Items>)itemrepository.findAll();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}
	
	public int createNewOrder() {
		Orders o=new Orders();
		o.setOrder_date(new Date());
		orderrepository.save(o);
		return o.getOrder_id();
	}
	
	public void saveItems(Ordersnew orderItem)
	{
		int order_id=createNewOrder();
		int item_id=orderItem.getItem_id();
		int quantity=orderItem.getQuantity();
		Order_Item oi=new Order_Item();
		Orders o=new Orders();
		o.setOrder_id(order_id);
		oi.setOrder(o);
		Items i=new Items();
		i.setItem_id(item_id);
		oi.setItem(i);
		oi.setQuantity(quantity);
		orderitemrepository.save(oi);	
		
	}
	public List<Order_Item> getViewItemList() {
		List<Order_Item>orderlist=orderitemrepository.findOrderItems();
		System.out.println("************"+orderlist);
		return orderlist;
	}
	public List<Order_Item> getOrders(int orderid)
	{
		return orderitemrepository.getOrdersById(orderid);
	}
	public void savenewItems(Ordersnew orderItem)
	{
		System.out.println(orderItem);
		int order_id=orderItem.getOrder_id();
		int item_id=orderItem.getItem_id();
		int quantity=orderItem.getQuantity();
		Order_Item oi=new Order_Item();
		Orders o=new Orders();
		o.setOrder_id(order_id);
		oi.setOrder(o);
		Items i=new Items();
		i.setItem_id(item_id);
		oi.setItem(i);
		oi.setQuantity(quantity);
		orderitemrepository.save(oi);	
	}
	
	public void updateItems(int id, int item_id, int quantity) {
		Optional<Order_Item>op=orderitemrepository.findById(id);
		Order_Item oi=op.get();
		System.out.println("Befor updated:"+oi);
		Items i=new Items();
		i.setItem_id(item_id);
		oi.setItem(i);
		oi.setQuantity(quantity);
		Order_Item res=orderitemrepository.save(oi);
		System.out.println("after updated:"+res);
		
	}
	public void deleteItem(int id)
	{
		orderitemrepository.deleteById(id);
	}
	public void deleteOrders(int orderid)
	{
		orderitemrepository.deleteAllOrders(orderid);
		orderrepository.deleteById(orderid);
	}
}
