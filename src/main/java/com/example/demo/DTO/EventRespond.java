package com.example.demo.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EventRespond {
    private Long id;
    private String title;
    private LocalDateTime event_date;


    private Long subject_id;
    private String subject_name;
}