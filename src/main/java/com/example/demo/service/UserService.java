package com.example.demo.service;

import com.example.demo.entry.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service


public class UserService {
    @Autowired
    private UserRepository userRepository;
    // lay cai mat khau duoc tiem
    @Autowired
    private PasswordEncoder passwordEncoder ;


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
        public User LoginUser(String email, String password) {


           User user = userRepository.findByEmail(email);
           if (user == null) {
               throw new RuntimeException("Tai khoan khong ton tai");
           }

              if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Mat khau khong dung");
              }
            if (!user.isVerified()) {
                throw new RuntimeException("Vui lòng xác thực email trước khi đăng nhập!");
            }
                return user;

        }
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
