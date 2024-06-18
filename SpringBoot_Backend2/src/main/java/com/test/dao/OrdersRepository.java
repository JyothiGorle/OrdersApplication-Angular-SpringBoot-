package com.test.dao;

import org.springframework.data.repository.CrudRepository;

import com.test.model.Orders;

public interface OrdersRepository extends CrudRepository<Orders, Integer> {

}
