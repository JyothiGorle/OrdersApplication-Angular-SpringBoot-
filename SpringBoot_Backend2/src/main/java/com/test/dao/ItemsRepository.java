package com.test.dao;

import org.springframework.data.repository.CrudRepository;

import com.test.model.Items;

public interface ItemsRepository extends CrudRepository<Items, Integer>{

}
