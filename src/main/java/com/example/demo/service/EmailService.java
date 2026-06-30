package com.example.demo.service;

import com.example.demo.entry.OtpToken;
import com.example.demo.entry.User;
import com.example.demo.repository.OtpTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private OtpTokenRepository otpTokenRepository;

    public void generateAndSendOtp(User user, String toEmail) {
        //Tìm xem user này có mã OTP nào cũ chưa hết hạn không, có thì xóa đi
        OtpToken oldToken = otpTokenRepository.findByUser(user);
        if (oldToken != null) {
            otpTokenRepository.delete(oldToken);
        }
        //Sinh mã OTP ngẫu nhiên 6 chữ số (từ 000000 đến 999999)
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        OtpToken newToken = new OtpToken();
        newToken.setOtpCode(otpCode);
        newToken.setExpirationTime(LocalDateTime.now().plusMinutes(5));
        newToken.setUser(user);
        otpTokenRepository.save(newToken);


        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Mã xác nhận đăng ký tài khoản");
            message.setText("Xin chào,\n\n" +
                    "Mã xác nhận (OTP) của bạn là: " + otpCode + "\n\n" +
                    "Mã này sẽ hết hạn sau 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.\n\n" +
                    "Trân trọng!");

            mailSender.send(message);
        } catch (Exception e) {
            // Nếu gửi mail lỗi (VD: sai email, rớt mạng), ta ném ra lỗi để báo cho Controller biết
            throw new RuntimeException("Lỗi khi gửi email: " + e.getMessage());
        }
    }



}
