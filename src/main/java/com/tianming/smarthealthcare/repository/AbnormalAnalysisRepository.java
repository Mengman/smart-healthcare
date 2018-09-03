package com.tianming.smarthealthcare.repository;

import com.tianming.smarthealthcare.domain.AbnormalAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by ycli on 31/08/18.
 */
public interface AbnormalAnalysisRepository extends JpaRepository<AbnormalAnalysis, Long> {
}
