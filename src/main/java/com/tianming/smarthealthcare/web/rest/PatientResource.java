package com.tianming.smarthealthcare.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tianming.smarthealthcare.domain.Patient;
import com.tianming.smarthealthcare.service.PatientService;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class PatientResource {

    private final Logger log = LoggerFactory.getLogger(PatientResource.class);

    @Autowired
    private PatientService patientService;

    @PostMapping("/patient")
    @Timed
    public ResponseEntity<Result> createUser(@RequestBody Patient patient) throws URISyntaxException{
        log.debug("REST request to save User : {}", patient);
        Patient savedPatient = patientService.createPatient(patient);
        return ResponseEntity.created(new URI("/api/patient/"))
            .body(new Result(0, "success", savedPatient));
    }
}
