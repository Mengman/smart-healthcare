package com.tianming.smarthealthcare.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.security.SecurityUtils;
import com.tianming.smarthealthcare.service.PatientService;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientResource {

    private final Logger log = LoggerFactory.getLogger(PatientResource.class);

    @Autowired
    private PatientService patientService;

    @PostMapping("/patient")
    @Timed
    public ResponseEntity<Result> createPatient(@RequestBody Patient patient) throws URISyntaxException{
        log.debug("REST request to save Patient : {}", patient);
        Patient savedPatient = patientService.createPatient(patient);
        return ResponseEntity.ok(new Result(0, "success", savedPatient));
    }

    @GetMapping("/patient")
    @Timed
    public ResponseEntity<Result> getPatients() throws URISyntaxException{
        log.debug("REST request to get Patients");
        String username = SecurityUtils.getCurrentUserLogin();
        List<Patient> patients = patientService.getPatients(username);
        return ResponseEntity.ok(new Result(0, "success", patients));
    }

    @GetMapping("/patient/{patientId}")
    @Timed
    public ResponseEntity<Result> getPatient(@PathVariable Long patientId) throws URISyntaxException{
        log.debug("REST request to get Patient {}", patientId);
        Patient patient = patientService.getPatient(patientId);
        return ResponseEntity.ok(new Result(0, "success", patient));
    }
}
