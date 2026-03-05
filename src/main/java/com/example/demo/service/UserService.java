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
        if(user.getEmail() == null || user.getPassword() == null) {
            throw new RuntimeException("Email va mat khau khong duoc de trong");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email da ton tai");
        }

            String passwordEncoded = passwordEncoder.encode(user.getPassword());
            user.setPassword(passwordEncoded);
            return userRepository.save(user);
        }
        public User LoginUser(String msv, String password) {

           Long msvLong = Long.parseLong(msv);
           User user = userRepository.findByMsv(msvLong);
           if (user == null) {
               throw new RuntimeException("Tai khoan khong ton tai");
           }

              if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Mat khau khong dung");
              }
                return user;
        }






}
