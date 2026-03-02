package controller;
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
@RequestMapping



class AuthController {
@Autowired
private UserService userService;

@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user ) {
    try {
        User registeredUser = userService.RegisterUser(user);
        return ResponseEntity.ok("Dang ky thanh cong tai khoan" + registeredUser.getEmail());
    }
    catch(RuntimeException e) {
        return ResponseEntity.badRequest().body("Email da ton tai");
    }
}

}