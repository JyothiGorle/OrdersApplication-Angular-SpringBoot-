package com.test.model;

public class Ordersnew {
	private int id;
	private int order_id;
	private int item_id;
	private int quantity;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Ordersnew(int order_id, int item_id, int quantity) {
		super();
		this.order_id = order_id;
		this.item_id = item_id;
		this.quantity = quantity;
	}
	public String toString() {
		return "Ordersnew [order_id=" + order_id + ", item_id=" + item_id + ", quantity=" + quantity + "]";
	}
	
}
