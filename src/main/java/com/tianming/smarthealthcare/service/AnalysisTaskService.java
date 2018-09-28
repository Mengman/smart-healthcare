package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.config.ApplicationProperties;
import com.tianming.smarthealthcare.domain.*;
import com.tianming.smarthealthcare.repository.*;
import com.tianming.smarthealthcare.web.rest.vm.AnalysisTaskVM;
import com.tianming.smarthealthcare.web.rest.vm.DiagnoseTaskVM;
import com.tianming.smarthealthcare.web.rest.vm.ExamResultVM;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.io.DicomInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnalysisTaskService {
    private final Logger log = LoggerFactory.getLogger(AnalysisTaskService.class);

    private String uploadDir;
    private AnalysisTaskRepository analysisTaskRepository;
    private PatientRepository patientRepository;
    private StorageRepository storageRepository;
    private DemoRepository demoRepository;
    private CtdAnalysisRepository ctdAnalysisRepository;
    private DicomParserService dicomParserService;

    @Autowired
    public void setDicomParserService(DicomParserService dicomParserService) {
        this.dicomParserService = dicomParserService;
    }

    public AnalysisTaskService(ApplicationProperties applicationProperties,
                               AnalysisTaskRepository analysisTaskRepository,
                               PatientRepository patientRepository,
                               StorageRepository storageRepository,
                               DemoRepository demoRepository,
                               CtdAnalysisRepository ctdAnalysisRepository) {
        this.analysisTaskRepository = analysisTaskRepository;
        this.patientRepository = patientRepository;
        this.storageRepository = storageRepository;
        this.demoRepository = demoRepository;
        this.ctdAnalysisRepository = ctdAnalysisRepository;
        this.uploadDir = applicationProperties.getUploadDir();
    }

    public AnalysisTask create(AnalysisTaskVM analysisTaskVM) throws NoSuchPatientException, IOException {
        Optional<Patient> patient = patientRepository.findById(analysisTaskVM.getPatientId());
        Patient patientInfo;
        patientInfo = patient.orElseGet(Patient::new);
        BeanUtils.copyProperties(analysisTaskVM.getPatient(), patientInfo);

        Optional<Storage> file = storageRepository.findById(analysisTaskVM.getXrayId());
        if (!file.isPresent()) {throw new NoSuchFileException("no such xray file");}

        File dicom = new File(Paths.get(uploadDir, file.get().getFileRelativePath()).toAbsolutePath().toString());
        DicomInputStream din = new DicomInputStream(dicom);
        Attributes attributes = din.readDataset(-1,-1);
        Patient dicomPatientInfo =  dicomParserService.getPatientFromDicom(attributes);

        boolean patientUpdated = false;
        if (patientInfo.getSopInstanceUid() == null) {
            patientInfo.setSopInstanceUid(dicomPatientInfo.getSopInstanceUid());
            patientUpdated = true;
        }
        if (patientInfo.getInstitutionName() == null) {
            patientInfo.setInstitutionName(dicomPatientInfo.getInstitutionName());
            patientUpdated = true;
        }
        if (patientInfo.getPatientId() == null) {
            patientInfo.setPatientId(dicomPatientInfo.getPatientId());
            patientUpdated = true;
        }

        if (patientUpdated) {
            patientRepository.save(patientInfo);
        }

        AnalysisTask analysisTask = new AnalysisTask();
        BeanUtils.copyProperties(analysisTaskVM, analysisTask);
        analysisTask.setPatient(patientInfo);

        //get demo result, 每次新建任务
//        Storage f = file.get();
//        Optional<Demo> demoResult = demoRepository.findByDemoName(f.getOriginalName());
//        if (demoResult.isPresent()) {
//            //demo data
//            analysisTask.setAnalysisStatus(1);
//            analysisTask.setAnalysisResult(demoResult.get().getDemoResult());
//        }

        CtdAnalysis ctdAnalysis = new CtdAnalysis();
        ctdAnalysisRepository.save(ctdAnalysis);
        analysisTask.setCtdAnalysis(ctdAnalysis);
        return analysisTaskRepository.save(analysisTask);
    }

    public AnalysisTask modify(DiagnoseTaskVM diagnoseTaskVM) {
        AnalysisTask analysisTask = analysisTaskRepository.findOne(diagnoseTaskVM.getId());
        analysisTask.setDiagnosisResult(diagnoseTaskVM.getDiagnosisResult());
        analysisTask.setDiagnosisComment(diagnoseTaskVM.getDiagnosisComment());
        return analysisTaskRepository.save(analysisTask);
    }

    public Page<AnalysisTask> getTasks(String username, Pageable pageable) {
        return analysisTaskRepository.findByCreatedBy(username, pageable);
    }

    public AnalysisTask getTask(Long taskId) {
        return analysisTaskRepository.findOne(taskId);
    }

    public AnalysisTask createTask(Storage storage, Patient patient) {
        CtdAnalysis ctdAnalysis = new CtdAnalysis();
        ctdAnalysisRepository.save(ctdAnalysis);

        AnalysisTask analysisTask = new AnalysisTask();
        analysisTask.setPatient(patient);
        analysisTask.setXrayId(storage.getId());
        analysisTask.setCtdAnalysis(ctdAnalysis);
        return analysisTaskRepository.save(analysisTask);
    }

    public List<AnalysisTask> getAllTasks(String username) {
        return analysisTaskRepository.findByCreatedByOrderByCreatedDateDesc(username);
    }

    public List<AnalysisTask> getAllTasks() {
        return analysisTaskRepository.findAllByOrderByCreatedDateDesc();
    }

    public ExamResultVM countExamResult() {
        Long totalTask = analysisTaskRepository.count();

        Long totalSuspectedCases = analysisTaskRepository.countTotalSuspectedCases();
        Long totalConfirmedCases = analysisTaskRepository.countTotalConfirmedCases();
        LocalDateTime startOfToday = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);

        Long todayTask = analysisTaskRepository.countTaskCreatedDateAfter(startOfToday);
        Long todaySuspectedCases = analysisTaskRepository.countSuspectedCasesByLastModifiedDateAfter(startOfToday);
        Long todayConfirmedCases = analysisTaskRepository.countConfirmedCasesByLastModifiedDateAfter(startOfToday);

        ExamResultVM examResultVM = new ExamResultVM();
        examResultVM.setTotalTask(totalTask);
        examResultVM.setSuspected(totalSuspectedCases);
        examResultVM.setConfirmed(totalConfirmedCases);
        examResultVM.setTodayTask(todayTask);
        examResultVM.setTodaySuspected(todaySuspectedCases);
        examResultVM.setTodayConfirmed(todayConfirmedCases);

        return examResultVM;
    }
}
