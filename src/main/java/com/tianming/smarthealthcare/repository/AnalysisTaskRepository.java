package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AnalysisTaskRepository extends JpaRepository<AnalysisTask, Long> {
    Page<AnalysisTask> findByCreatedBy(String username, Pageable pageable);

    List<AnalysisTask> findByCreatedByOrderByCreatedDateDesc(String username);

    @Query(value = "SELECT COUNT(id) FROM analysis_task where analysis_result > 0 AND  diagnosis_result is NULL", nativeQuery = true)
    Long countTotalSuspectedCases();

    @Query(value = "SELECT COUNT(id) FROM analysis_task WHERE diagnosis_result > 0", nativeQuery = true)
    Long countTotalConfirmedCases();

    @Query(value = "SELECT COUNT(id) FROM analysis_task WHERE created_date > ?1", nativeQuery = true)
    Long countTaskCreatedDateAfter(LocalDateTime startOfToday);

    @Query(value = "SELECT COUNT(id) FROM analysis_task where last_modified_date > ?1 AND analysis_result > 0 AND diagnosis_result is NULL", nativeQuery = true)
    Long countSuspectedCasesByLastModifiedDateAfter(LocalDateTime startOfToday);

    @Query(value = "SELECT COUNT(id) FROM analysis_task WHERE last_modified_date > ?1 AND diagnosis_result > 0", nativeQuery = true)
    Long countConfirmedCasesByLastModifiedDateAfter(LocalDateTime startOfToday);
}
