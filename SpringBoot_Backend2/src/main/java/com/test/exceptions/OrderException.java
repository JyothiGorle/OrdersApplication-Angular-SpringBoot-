package com.test.exceptions;

public class OrderException extends RuntimeException{

	public OrderException(String message) {
		super(message);
		System.out.println("????????"+message);
	}
}
