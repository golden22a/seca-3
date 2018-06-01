package com.example.apigateway.config;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import static com.example.apigateway.config.SecurityConstant.HEADER_STRING;
import static com.example.apigateway.config.SecurityConstant.SECRET;
import static com.example.apigateway.config.SecurityConstant.TOKEN_PREFIX;


public class JWTAuthorizationFilter extends BasicAuthenticationFilter {


    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getParameter(HEADER_STRING);
        Enumeration<String> headerNames = req.getParameterNames();

        for (; headerNames.hasMoreElements();) {
            String o = headerNames.nextElement();
            System.out.println(o);
        }
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getParameter(HEADER_STRING);
        if (token != null) {
            // parse the token.
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET.getBytes())
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();

            String user=claims.get("user",String.class);
            System.out.println(user);

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority( claims.get("role",String.class)));

//            System.out.println(uSer.toString());
            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            }
            return null;
        }
        return null;
    }





}
