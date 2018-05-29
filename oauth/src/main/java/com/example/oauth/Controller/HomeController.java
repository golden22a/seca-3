package com.example.oauth.Controller;

import com.example.oauth.Model.UserModel;
import com.example.oauth.repo.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static com.example.oauth.Config.SecurityConstant.*;

@RestController
public class HomeController {
    @Autowired
    private UserRepo userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public HomeController(UserRepo applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody UserModel userModel,
                       HttpServletResponse res) throws IOException {
        userModel.setPassword(bCryptPasswordEncoder.encode(userModel.getPassword()));
        userRepository.save(userModel);
        String token = Jwts.builder()
                .claim("user",userModel.getUsername())
                .claim("role","ROLE_"+userModel.getRole().toUpperCase())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        JSONObject item = new JSONObject();
        try {
            item.put(HEADER_STRING,TOKEN_PREFIX + token);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        res.getWriter().write(item.toString());

    }
    @GetMapping("/lol")
    public void hey(){

        System.out.println("yo");
    }




//        @GetMapping(value = "/")
//        public String index(){
//            return "Hello world";
//        }
//
//        @GetMapping(value = "/private")
//        public String privateArea(){
//            return "Private area";
//        }
//
//        @PostMapping(value="/register")
//        public User createNewUser(@RequestBody User newUser) {
//            return userRepository.save(newUser);
//        }

        }


