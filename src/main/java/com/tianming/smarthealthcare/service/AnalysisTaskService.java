package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.repository.AnalysisTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AnalysisTaskService {
    private final Logger log = LoggerFactory.getLogger(AnalysisTaskService.class);

    @Autowired
    private AnalysisTaskRepository analysisTaskRepository;

    public AnalysisTask create(AnalysisTask analysisTask) {
        return analysisTaskRepository.save(analysisTask);
    }

    public AnalysisTask modify(AnalysisTask analysisTask) {
        return analysisTaskRepository.save(analysisTask);
    }

    public List<AnalysisTask> getTasks(String username) {
        return analysisTaskRepository.findByCreatedByOrderByCreatedDateDesc(username);
    }

    public AnalysisTask getTask(Long taskId) {
        return analysisTaskRepository.findOne(taskId);
    }
}
