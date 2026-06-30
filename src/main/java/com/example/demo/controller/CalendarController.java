package com.example.demo.controller;

import com.example.demo.entry.Event;
import com.example.demo.entry.Subject;
import com.example.demo.entry.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin("*")
public class CalendarController {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private com.example.demo.repository.UserRepository userRepository;

    @GetMapping("/subjects")
    public List<Subject> getAllSubjects() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        return subjectRepository.findByUserMsv(user.getMsv());
    }
    @PostMapping("/subjects")
    public Subject createSubject(@RequestBody Subject subject) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);

        subject.setUser(user); // Gán chủ sở hữu trước khi lưu
        return subjectRepository.save(subject);
    }
    @GetMapping("/events")
    public List<Event> getAllEvents() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        return eventRepository.findByUserMsv(user.getMsv());
    }
    @PostMapping("/events")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        Subject subject = subjectRepository.findById(event.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy môn học"));

        // Kiểm tra subject có thuộc user hiện tại không
        if (!subject.getUser().getMsv().equals(user.getMsv())) {
            return ResponseEntity.status(403)
                    .body("Bạn không có quyền thêm sự kiện vào môn học này");
        }

        event.setSubject(subject);
        event.setUser(user);

        Event savedEvent = eventRepository.save(event);

        return ResponseEntity.ok(savedEvent);
    }



}
