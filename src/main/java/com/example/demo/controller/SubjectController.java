package com.example.demo.controller;

import com.example.demo.DTO.SubjectRequest;
import com.example.demo.entry.Subject;
import com.example.demo.entry.User;
import com.example.demo.repository.SubjectRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/subjects")
public class SubjectController {
@Autowired
    SubjectRepository subjectRepository;
@Autowired
    UserRepository userRepository;
@PostMapping("/add")

    public ResponseEntity<?> addSubject(@RequestBody SubjectRequest subjectRequest) {
        try {
    User user = userRepository.findByEmail(subjectRequest.getEmail());
    if(user == null) {
        return ResponseEntity.badRequest().body("User not found with email: " + subjectRequest.getEmail());
    }
    Subject subject = new Subject();
    subject.setName(subjectRequest.getName());
    subject.setUser(user);
    Subject savedSubject = subjectRepository.save(subject);
    return ResponseEntity.ok(savedSubject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
}
    @GetMapping("/list")
    public ResponseEntity<?> getAllSubjects() {
        try {

            List<Subject> subjects = subjectRepository.findAll();


            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

