package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AnalysisTaskRepository extends JpaRepository<AnalysisTask, Long> {
    List<AnalysisTask> findByCreatedBy(String username);

    List<AnalysisTask> findByCreatedByOrderByCreatedDateDesc(String username);
}
