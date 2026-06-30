package com.example.demo.controller;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.RegisterDTO;
import com.example.demo.config.JwtTokenProvider;
import com.example.demo.entry.OtpToken;
import com.example.demo.entry.User;
import com.example.demo.repository.OtpTokenRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    @Autowired
    private EmailService emailService;
    @Autowired
    private com.example.demo.repository.UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO request) {
        try {


            User newUser = new User();


            newUser.setMsv((request.getMsv()));

            newUser.setEmail(request.getEmail());
            newUser.setPassword(request.getPassword());




            User registeredUser = userService.RegisterUser(newUser);


            emailService.generateAndSendOtp(registeredUser, registeredUser.getEmail());

            return ResponseEntity.ok("Dang ky thanh cong tai khoan: " + registeredUser.getEmail());
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
            userData.put("msv", user.getMsv());
            userData.put("email", user.getEmail());

            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestParam Long msv, @RequestParam String otpCode) {
        try {
            //  Tìm User theo MSV
            User user = userRepository.findById(msv)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

            // 2. Tìm mã OTP của User này trong Database
            OtpToken otpToken = otpTokenRepository.findByUser(user);

            if (otpToken == null) {
                return ResponseEntity.badRequest().body("Bạn chưa yêu cầu mã xác nhận hoặc mã đã bị xóa.");
            }

            // Kiểm tra mã có khớp không
            if (!otpToken.getOtpCode().equals(otpCode)) {
                return ResponseEntity.badRequest().body("Mã xác nhận không chính xác!");
            }

            //  Kiểm tra mã có bị hết hạn không (VD: quá 5 phút)
            if (otpToken.getExpirationTime().isBefore(LocalDateTime.now())) {
                otpTokenRepository.delete(otpToken);
                return ResponseEntity.badRequest().body("Mã xác nhận đã hết hạn. Vui lòng gửi lại!");
            }

            //Kích hoạt tài khoản
            user.setVerified(true);
            userRepository.save(user);

            // Xóa mã OTP đi vì đã dùng xong (một mã chỉ dùng 1 lần)
            otpTokenRepository.delete(otpToken);

            return ResponseEntity.ok("Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xác thực: " + e.getMessage());
        }
    }
}