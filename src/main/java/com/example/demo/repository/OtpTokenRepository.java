package com.example.demo.repository;

import com.example.demo.entry.OtpToken;
import com.example.demo.entry.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {


    OtpToken findByOtpCode(String otpCode);


    OtpToken findByUser(User user);
}