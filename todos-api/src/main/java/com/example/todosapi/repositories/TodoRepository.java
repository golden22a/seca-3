package com.example.todosapi.repositories;

import com.example.todosapi.models.Todos;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TodoRepository extends CrudRepository<Todos, Long> {

@Query("SELECT t FROM Todos t WHERE t.done=false and t.user_id= :user_id")
Iterable<Todos> findAllByUser(@Param("user_id") Long user_id);
@Query("SELECT t FROM Todos t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%',:title,'%'))")
Iterable<Todos> findTodosBytitle(@Param("title") String title);

}
