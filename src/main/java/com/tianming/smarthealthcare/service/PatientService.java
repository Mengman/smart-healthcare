package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PatientService {
    private final Logger log = LoggerFactory.getLogger(PatientService.class);

    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getPatients(String username) {
        return patientRepository.findByCreatedBy(username);
    }

    public Patient getPatient(Long patientId) {
        Patient patient = patientRepository.findOne(patientId);
        patient.getTasks();
        return patient;
    }
}
