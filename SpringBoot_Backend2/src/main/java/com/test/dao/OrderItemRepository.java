package com.test.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.test.model.Order_Item;

import jakarta.transaction.Transactional;
public interface OrderItemRepository extends CrudRepository<Order_Item, Integer>{
	@Query(value="select oi.id,oi.order_id,oi.item_id,i.item_name,i.item_price,oi.quantity from order_item oi left join items i on i.item_id=oi.item_id",nativeQuery=true)
	public List<Order_Item> findOrderItems();
	
	@Query(value="select oi.id,oi.order_id,oi.item_id,i.item_name,i.item_price,oi.quantity from order_item oi left join items i on i.item_id=oi.item_id where oi.order_id=?1",nativeQuery=true)
	public List<Order_Item>getOrdersById(int order_id);

	@Modifying
	@Transactional
	@Query(value="delete from order_item where order_id=?1",nativeQuery=true)
	public void deleteAllOrders(int orderid);


}
