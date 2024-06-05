package com.app.portfolioBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int idUser;
    private String userName;
    private String password;
    private String email;
    private String rol;

    public User(String userName, String password, String email, String rol) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.rol = rol;
    }
}
