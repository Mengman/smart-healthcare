package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {
}
