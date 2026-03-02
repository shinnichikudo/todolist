package com.example.demo.entry;

import lombok.Data;
import jakarta.persistence.*;
@Entity
@Table(name="user")
@Data


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long msv;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
}


