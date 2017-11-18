package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.repository.AnalysisTaskRepository;
import com.tianming.smarthealthcare.repository.PatientRepository;
import com.tianming.smarthealthcare.web.rest.vm.AnalysisTaskVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnalysisTaskService {
    private final Logger log = LoggerFactory.getLogger(AnalysisTaskService.class);

    private AnalysisTaskRepository analysisTaskRepository;
    private PatientRepository patientRepository;

    public AnalysisTaskService(AnalysisTaskRepository analysisTaskRepository, PatientRepository patientRepository) {
        this.analysisTaskRepository = analysisTaskRepository;
        this.patientRepository = patientRepository;
    }

    public AnalysisTask create(AnalysisTaskVM analysisTaskVM) throws NoSuchPatientException {
        Optional<Patient> patient = patientRepository.findById(analysisTaskVM.getPatientId());
        if (!patient.isPresent()) {throw new NoSuchPatientException();}
        AnalysisTask analysisTask = new AnalysisTask();
        BeanUtils.copyProperties(analysisTaskVM, analysisTask);
        analysisTask.setPatient(patient.get());
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
