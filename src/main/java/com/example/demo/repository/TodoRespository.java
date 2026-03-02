package com.example.demo.repository;
import  com.example.demo.entry.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface TodoRespository extends JpaRepository<Todo, Long> {
List <Todo> findByUserId(Long msv);
}
