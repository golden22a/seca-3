package com.example.scheduleapi.Repository;

import com.example.scheduleapi.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String userName);
}