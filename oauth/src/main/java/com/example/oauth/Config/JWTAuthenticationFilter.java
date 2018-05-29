package com.example.oauth.Config;

import com.example.oauth.Model.UserModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.userdetails.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.example.oauth.Config.SecurityConstant.EXPIRATION_TIME;
import static com.example.oauth.Config.SecurityConstant.HEADER_STRING;
import static com.example.oauth.Config.SecurityConstant.TOKEN_PREFIX;
import static com.example.oauth.Config.SecurityConstant.SECRET;



public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
        private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            UserModel creds = new ObjectMapper()
                    .readValue(req.getInputStream(), UserModel.class);
            System.out.println("a");
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {



        String token = Jwts.builder()
                .claim("user",((User) auth.getPrincipal()).getUsername())
                .claim("role",
                        ((User) auth.getPrincipal()).
                        getAuthorities().toString().
                        replace("[","")
                        .replace("]",""))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();

        JSONObject item = new JSONObject();
        System.out.println();
        System.out.println("heeeeey");
        try {
            item.put(HEADER_STRING,TOKEN_PREFIX + token);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        res.getWriter().write(item.toString());

    }
    public static void callAuth(){
    }
}
