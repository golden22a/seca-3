package com.example.oauth.repo;

import com.example.oauth.Model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<UserModel, Long> {

    UserModel findByUsername(String username);

}
