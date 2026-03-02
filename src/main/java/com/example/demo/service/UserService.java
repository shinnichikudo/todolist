package com.example.demo.service;

import com.example.demo.entry.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password4j.BcryptPassword4jPasswordEncoder;
import org.springframework.stereotype.Service;

@Service


public class UserService {
    @Autowired
    private UserRepository userRepository;
    // bam mat khau
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public User RegisterUser(User user) {
        if (userRepository.findByEmail(user.getEmail())!= null) {
            throw new RuntimeException("Email da ton tai");
        }

            String passwordEncoded = passwordEncoder.encode(user.getPassword());
            user.setPassword(passwordEncoded);
            return userRepository.save(user);
        }






}
