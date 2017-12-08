package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.domain.Demo;
import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.domain.Storage;
import com.tianming.smarthealthcare.repository.AnalysisTaskRepository;
import com.tianming.smarthealthcare.repository.DemoRepository;
import com.tianming.smarthealthcare.repository.PatientRepository;
import com.tianming.smarthealthcare.repository.StorageRepository;
import com.tianming.smarthealthcare.web.rest.vm.AnalysisTaskVM;
import com.tianming.smarthealthcare.web.rest.vm.DiagnoseTaskVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.NoSuchFileException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnalysisTaskService {
    private final Logger log = LoggerFactory.getLogger(AnalysisTaskService.class);

    private AnalysisTaskRepository analysisTaskRepository;
    private PatientRepository patientRepository;
    private StorageRepository storageRepository;
    private DemoRepository demoRepository;

    public AnalysisTaskService(AnalysisTaskRepository analysisTaskRepository, PatientRepository patientRepository, StorageRepository storageRepository, DemoRepository demoRepository) {
        this.analysisTaskRepository = analysisTaskRepository;
        this.patientRepository = patientRepository;
        this.storageRepository = storageRepository;
        this.demoRepository = demoRepository;
    }

    public AnalysisTask create(AnalysisTaskVM analysisTaskVM) throws NoSuchPatientException, NoSuchFileException {
        Optional<Patient> patient = patientRepository.findById(analysisTaskVM.getPatientId());
        if (!patient.isPresent()) {throw new NoSuchPatientException();}
        Optional<Storage> file = storageRepository.findById(analysisTaskVM.getXrayId());
        if (!file.isPresent()) {throw new NoSuchFileException("no such xray file");}

        AnalysisTask analysisTask = new AnalysisTask();
        BeanUtils.copyProperties(analysisTaskVM, analysisTask);
        analysisTask.setPatient(patient.get());

        //get demo result
        Storage f = file.get();
        Optional<Demo> demoResult = demoRepository.findByDemoName(f.getOriginalName());
        if (demoResult.isPresent()) {
            //demo data
            analysisTask.setAnalysisStatus(1);
            analysisTask.setAnalysisResult(demoResult.get().getDemoResult());
        }

        return analysisTaskRepository.save(analysisTask);
    }

    public AnalysisTask modify(DiagnoseTaskVM diagnoseTaskVM) {
        AnalysisTask analysisTask = analysisTaskRepository.findOne(diagnoseTaskVM.getId());
        analysisTask.setDiagnosisResult(diagnoseTaskVM.getDiagnosisResult());
        analysisTask.setDiagnosisComment(diagnoseTaskVM.getDiagnosisComment());
        return analysisTaskRepository.save(analysisTask);
    }

    public List<AnalysisTask> getTasks(String username) {
        return analysisTaskRepository.findByCreatedByOrderByCreatedDateDesc(username);
    }

    public AnalysisTask getTask(Long taskId) {
        return analysisTaskRepository.findOne(taskId);
    }

    public AnalysisTask createTask(Storage storage, Patient patient) {
        AnalysisTask analysisTask = new AnalysisTask();
        analysisTask.setPatient(patient);
        analysisTask.setXrayId(storage.getId());
        return analysisTaskRepository.save(analysisTask);
    }
}
