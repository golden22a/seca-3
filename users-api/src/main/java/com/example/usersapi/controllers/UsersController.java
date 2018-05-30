package com.example.usersapi.controllers;
import com.example.usersapi.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.usersapi.repositories.UserRepository;

import javax.servlet.http.HttpServletRequest;

import static com.example.usersapi.controllers.SecurityConstant.HEADER_STRING;
import static com.example.usersapi.controllers.SecurityConstant.SECRET;
import static com.example.usersapi.controllers.SecurityConstant.TOKEN_PREFIX;

@RestController
public class UsersController {
    @Autowired
    private UserRepository userRepository;
        @GetMapping("/")
        public User findUser(HttpServletRequest request) {
            String token = request.getParameter(HEADER_STRING);

                // parse the token.
                Claims claims = Jwts.parser()
                        .setSigningKey(SECRET.getBytes())
                        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                        .getBody();

                String user = claims.get("user", String.class);



            return userRepository.findByUsername(user);

        }
    @GetMapping("/all")
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/{userId}")
    public User findUserById(@PathVariable Long userId) {
        return userRepository.findOne(userId);
    }
    @DeleteMapping("/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) {
        userRepository.delete(userId);
        return HttpStatus.OK;
    }
    @PostMapping("/")
    public User createNewUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }
    @PatchMapping("/{userId}")
    public User updateUserById(@PathVariable Long userId, @RequestBody User userRequest) {

        User userFromDb = userRepository.findOne(userId);

        userFromDb.setFirstName(userRequest.getFirstName());
        userFromDb.setLastName(userRequest.getLastName());

        return userRepository.save(userFromDb);
    }








    }
