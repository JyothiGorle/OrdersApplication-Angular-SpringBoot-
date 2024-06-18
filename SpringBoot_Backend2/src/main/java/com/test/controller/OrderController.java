package com.test.controller;

import java.util.Date;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dao.ItemsRepository;
import com.test.dao.OrderItemRepository;
import com.test.dao.OrdersRepository;
import com.test.exceptions.ItemException;
import com.test.exceptions.OrderException;
import com.test.model.Items;
import com.test.model.Order_Item;
import com.test.model.Orders;
import com.test.model.Ordersnew;
import com.test.service.OrderServiceImpl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/")
public class OrderController {
	
	@Autowired
	private OrderServiceImpl orderserviceimpl;
	
	@GetMapping("/orders")
	public ResponseEntity<List<Orders>> getAllOrders()
	{
		List<Orders>orderlist=orderserviceimpl.getAllOrders();
		if(orderlist.size()<=0)
		{
			throw new OrderException("No Orders Found");
		}
		return ResponseEntity.ok(orderlist);
	}
	
	@GetMapping("/items")
	public ResponseEntity<List<Items>> getAllItems()
	{
		List<Items>itemlist=orderserviceimpl.getAllItems();
		if(itemlist.size()<=0)
		{
			throw new ItemException("No Items found");
		}
		return ResponseEntity.ok(itemlist);
	}
	
	@PostMapping("/additems")
	public ResponseEntity<?> saveItems(@RequestBody Ordersnew orderItem)
	{
		orderserviceimpl.saveItems(orderItem);
		return new ResponseEntity<>(HttpStatus.CREATED);	
	}
	
	@GetMapping("/viewitems")
	public ResponseEntity<List<Order_Item>> viewItemsList()
	{
		List<Order_Item>orderitemlist=orderserviceimpl.getViewItemList();
		if(orderitemlist.size()<=0)
		{
			throw new OrderException("No orderitems found");
		}
		return ResponseEntity.ok(orderitemlist);
	}
	

	@GetMapping("/editorder/{id}")
	public ResponseEntity<List<Order_Item>> editItemsList(@PathVariable("id") int order_id)
	{
		System.out.println("orderid:"+order_id);
		List<Order_Item>list=orderserviceimpl.getOrders(order_id);
		if(list.size()<=0)
		{
			throw new OrderException("Order with ID"  + order_id +  "not found");
		}
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/addnewitems")
	public ResponseEntity<?> saveNewItems(@RequestBody Ordersnew orderItem)
	{
		orderserviceimpl.savenewItems(orderItem);
		return new  ResponseEntity<>(HttpStatus.CREATED);
	}
	
	
	
	@PostMapping("/updateitems")
	public ResponseEntity<?> updateItems(@RequestBody Ordersnew orderItem)
	{
		int item_id=orderItem.getItem_id();
		int quantity=orderItem.getQuantity();
		int id=orderItem.getId();
		orderserviceimpl.updateItems(id,item_id,quantity);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@DeleteMapping("/deleteitem/{id}")
	public ResponseEntity<?> deleteItems(@PathVariable int id)
	{
		try {
			orderserviceimpl.deleteItem(id);
			return ResponseEntity.ok().build();
		}
		catch(Exception e)
		{
			System.out.println("the id is not found");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
		
	@DeleteMapping("/deleteorder/{orderid}")
	public ResponseEntity<?> deleteOrder(@PathVariable int orderid)
	{
		try {
			orderserviceimpl.deleteOrders(orderid);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@ExceptionHandler(OrderException.class)
    public ResponseEntity<String> handleOrderNotFoundException(OrderException ex) {
		System.out.println("%%%%%%%%%"+ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
	@ExceptionHandler(ItemException.class)
	public ResponseEntity<String> handleItemNotFoundException(ItemException ex)
	{
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleIdNotFoundException(Exception ex)
	{
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
	}
}
