package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
