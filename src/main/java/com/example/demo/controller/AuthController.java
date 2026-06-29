package com.example.demo.controller;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.config.JwtTokenProvider;
import com.example.demo.entry.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")


public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();

            String jwt = jwtTokenProvider.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", jwt);
            response.put("email", user.getEmail());
            response.put("message", "Đăng nhập thành công");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
                return ResponseEntity.status(401).body("Chưa xác thực hoặc token không hợp lệ");
            }


            String currentEmail = authentication.getName();
            System.out.println("Email lấy từ Token: " + currentEmail);


            User user = userService.findUserByEmail(currentEmail);

            if (user == null) {
                return ResponseEntity.status(404).body("Không tìm thấy sinh viên với email này");
            }

            // 4. Đóng gói trả về cho React
            Map<String, Object> userData = new HashMap<>();
            userData.put("msv", user.getMsv()); // Lấy msv từ DB chứ không lấy từ token nữa
            userData.put("email", user.getEmail());

            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}