package com.example.demo.controller;

import com.example.demo.DTO.EventDTO;
import com.example.demo.DTO.EventRespond;
import com.example.demo.entry.Event;
import com.example.demo.entry.Subject;
import com.example.demo.entry.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.SubjectRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;



    @GetMapping("/list")
    public ResponseEntity<?> getAllEvents() {
        try {
            List<Event> events = eventRepository.findAll();
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody EventDTO requestDTO) {
        try {
            Event newEvent = new Event();
            newEvent.setTitle(requestDTO.getTitle());
            newEvent.setEventDate(LocalDateTime.parse(requestDTO.getEvent_date()));
            Subject subject = subjectRepository.findById(requestDTO.getSubject_id())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy môn học có ID: " + requestDTO.getSubject_id()));
            newEvent.setSubject(subject);
            User user = userRepository.findById(Long.valueOf(requestDTO.getUser_msv()))
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên có MSV: " + requestDTO.getUser_msv()));
            newEvent.setUser(user);
            Event savedEvent = eventRepository.save(newEvent);
            EventRespond respond = new EventRespond();
            respond.setId(savedEvent.getId());
            respond.setTitle(savedEvent.getTitle());
            respond.setEvent_date(savedEvent.getEventDate());
            respond.setSubject_id(savedEvent.getSubject().getId());
            respond.setSubject_name(savedEvent.getSubject().getName());


            return ResponseEntity.ok(respond);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi lưu sự kiện " + e.getMessage());
        }
    }
}