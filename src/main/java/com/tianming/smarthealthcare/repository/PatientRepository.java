package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByCreatedBy(String username);
}
