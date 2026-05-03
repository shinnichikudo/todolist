package com.example.demo.controller;

import com.example.demo.entry.Event;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entry.Subject;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin("*")
public class CalendarController {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/subjects")
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
    @PostMapping("/subjects")
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectRepository.save(subject);
    }
    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }



}
