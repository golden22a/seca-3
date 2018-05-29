package com.example.oauth.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
@Data
@AllArgsConstructor
@Getter
@Setter
@Entity @Table(name = "USERS")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;
    @Column(name = "ROLE",columnDefinition="VARHAR(10) DEFAULT 'USER'")
    private String role;
    public UserModel(){}
    public  Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole(){
        return this.role;
    }
    public boolean hasRole(String a){
        return this.role.equals(a);
    }
    public String toString(){

        return this.username+" "+this.role;

        }
}