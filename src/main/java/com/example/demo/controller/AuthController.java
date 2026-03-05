package com.example.demo.controller;
import com.example.demo.entry.Todo;
import com.example.demo.entry.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import  org.springframework.web.bind.annotation.*;
import  org.springframework.http.HttpEntity;
import  org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@RestController
@RequestMapping("/api/auth")


class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.RegisterUser(user);
            return ResponseEntity.ok("Dang ky thanh cong tai khoan" + registeredUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String msv, @RequestParam String password) {
        try {
            User loggedInUser = userService.LoginUser(msv, password);
            return ResponseEntity.ok("Dang nhap thanh cong tai khoan" + loggedInUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}