package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AnalysisTaskRepository extends JpaRepository<AnalysisTask, Long> {
    Page<AnalysisTask> findByCreatedBy(String username, Pageable pageable);

    List<AnalysisTask> findByCreatedByOrderByCreatedDateDesc(String username);
}
