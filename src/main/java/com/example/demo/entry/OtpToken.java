package com.example.demo.entry;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_token")
@Data
public class OtpToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String otpCode;

    @Column(nullable = false)
    private LocalDateTime expirationTime;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_msv", nullable = false)
    private User user;
}