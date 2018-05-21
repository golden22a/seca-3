package com.example.todosapi.controllers;

import com.example.todosapi.models.Todos;
import com.example.todosapi.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodosController {
    @Autowired
    private TodoRepository todoRepository;
    @GetMapping("/user/{user_id}")
    public Iterable<Todos> findAllTodosByUser(@PathVariable Long user_id) {
        return todoRepository.findAllByUser(user_id);
    }
    @GetMapping("/{todoId}")
    public Todos findTodoById(@PathVariable Long todoId) {
        return todoRepository.findOne(todoId);
    }
    @DeleteMapping("/{todoId}")
    public HttpStatus deleteTodoById(@PathVariable Long todoId) {
        todoRepository.delete(todoId);
        return HttpStatus.OK;
    }
    @PostMapping("/")
    public Todos createNewTodo(@RequestBody Todos newTodos) {
        return todoRepository.save(newTodos);
    }
    @PatchMapping("/{todoId}")
    public Todos updateTodoById(@PathVariable Long todoId, @RequestBody Todos todosRequest) {

        Todos todoFromDb = todoRepository.findOne(todoId);
        todoFromDb.setTitle(todosRequest.getTitle());
        todoFromDb.setDone(todosRequest.isDone());
        return todoRepository.save(todoFromDb);
    }
    @GetMapping("/search/{title}")
    public Iterable<Todos> findByTitle(@PathVariable String title){
        return todoRepository.findTodosBytitle(title);

    }

}
