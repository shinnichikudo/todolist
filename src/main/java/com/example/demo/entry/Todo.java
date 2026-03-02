package com.example.demo.entry;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "todo")
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private boolean isCompleted = false;

    // Khóa ngoại liên kết với User
    @ManyToOne
    @JoinColumn(name = "user.msv", nullable = false)
    private User user;
}