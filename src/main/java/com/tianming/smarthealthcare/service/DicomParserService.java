package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.config.ApplicationProperties;
import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.domain.Storage;
import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DicomParserService {

    private final Logger log = LoggerFactory.getLogger(DicomParserService.class);
    private final SimpleDateFormat dimcomDateFormatter = new SimpleDateFormat("yyyyMMdd");

    private String uploadDir;
    private StorageService storageService;
    private AnalysisTaskService analysisTaskService;
    private PatientService patientService;

    @Autowired
    public DicomParserService(ApplicationProperties applicationProperties, StorageService storageService, AnalysisTaskService analysisTaskService, PatientService patientService) {
        this.uploadDir = applicationProperties.getUploadDir();
        this.storageService = storageService;
        this.analysisTaskService = analysisTaskService;
        this.patientService = patientService;
    }

    public AnalysisTask parseAndSave(MultipartFile file) throws IOException {
        // save file
        Storage storage = storageService.store(file);
        // check if exist
        if (checkFile(storage)) {
            // delete file
            storageService.deleteFile(storage);
            AnalysisTask analysisTask = new AnalysisTask();
            analysisTask.setDiagnosisComment("instance uid exist!");
            return analysisTask;
        }
        // save patient
        Patient patient = createNewPatient(storage);
        // save task
        AnalysisTask analysisTask = analysisTaskService.createTask(storage, patient);
        return analysisTask;
    }

    private boolean checkFile(Storage storage) throws IOException {
        File file = new File(Paths.get(uploadDir, storage.getFileRelativePath()).toAbsolutePath().toString());
        DicomInputStream din = new DicomInputStream(file);
        Attributes attributes = din.readDataset(-1,-1);
        String uid = attributes.getString(Tag.SOPInstanceUID);
        List<Patient> list = patientService.findBySopInstanceUid(uid);
        return (null != list) && (list.size() > 0);
    }

    private Patient createNewPatient(Storage storage) throws IOException {
        File file = new File(Paths.get(uploadDir, storage.getFileRelativePath()).toAbsolutePath().toString());
        DicomInputStream din = new DicomInputStream(file);
        Attributes attributes = din.readDataset(-1,-1);
        Patient patient = getPatientFromDicom(attributes);
        return patientService.save(patient);
    }

    private Patient getPatientFromDicom(Attributes attributes){
        Patient patient = new Patient();
        patient.setName(attributes.getString(Tag.PatientName));
        patient.setSex(attributes.getString(Tag.PatientSex));
        patient.setPatientId(attributes.getString(Tag.PatientID));
        try {
            patient.setImageDate(getDate(attributes.getString(Tag.StudyDate)));
        } catch (ParseException e) {
            log.error("fail to parse dicom studydate!");
        }
        patient.setInstitutionName(attributes.getString(Tag.InstitutionName));
        patient.setSopInstanceUid(attributes.getString(Tag.SOPInstanceUID));
        try {
            patient.setBirthday(getDate(attributes.getString(Tag.PatientBirthDate)));
        } catch (ParseException e){
            log.error("fail to parse dicom birthday!");
        }

        return patient;
    }

    private Date getDate(String str) throws ParseException{
        return StringUtils.isEmpty(str) ? null : dimcomDateFormatter.parse(str);
    }
}
