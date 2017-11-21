package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.Demo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DemoRepository extends JpaRepository<Demo, Long> {
    Optional<Demo> findByDemoName(String originalName);
}
