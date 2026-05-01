package com.example.demo.entry;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalTime eventDate;

    @Column
    private String subject;
    // Khóa ngoại liên kết với User
    @ManyToOne
    @JoinColumn(name = "user.msv", nullable = false)
    private User user;
}
