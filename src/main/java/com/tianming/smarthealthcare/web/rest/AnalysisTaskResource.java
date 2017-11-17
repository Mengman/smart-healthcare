package com.tianming.smarthealthcare.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.domain.Storage;
import com.tianming.smarthealthcare.security.SecurityUtils;
import com.tianming.smarthealthcare.service.AnalysisTaskService;
import com.tianming.smarthealthcare.service.StorageService;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AnalysisTaskResource {

    private final Logger log = LoggerFactory.getLogger(AnalysisTaskResource.class);

    @Autowired
    private AnalysisTaskService analysisTaskService;

    @PostMapping("/task")
    @Timed
    public ResponseEntity<Result> createTask(@RequestBody AnalysisTask analysisTask){
        log.debug("REST request to create analysis task : {}", analysisTask);
        AnalysisTask savedAnalysisTask = analysisTaskService.create(analysisTask);
        return ResponseEntity.ok(new Result(0, "success", savedAnalysisTask));
    }

    @PutMapping("/task")
    @Timed
    public ResponseEntity<Result> modifyTask(@RequestBody AnalysisTask analysisTask){
        log.debug("REST request to modify analysis task : {}", analysisTask);
        AnalysisTask savedAnalysisTask = analysisTaskService.modify(analysisTask);
        return ResponseEntity.ok(new Result(0, "success", savedAnalysisTask));
    }

    @GetMapping("/task")
    @Timed
    public ResponseEntity<Result> getTasks(){
        log.debug("REST request to get analysis tasks");
        String username = SecurityUtils.getCurrentUserLogin();
        List<AnalysisTask> analysisTasks = analysisTaskService.getTasks(username);
        return ResponseEntity.ok(new Result(0, "success", analysisTasks));
    }

    @GetMapping("/task/{taskId}")
    @Timed
    public ResponseEntity<Result> getTask(@PathVariable Long taskId){
        log.debug("REST request to get analysis task : {}", taskId);
        AnalysisTask analysisTask = analysisTaskService.getTask(taskId);
        return ResponseEntity.ok(new Result(0, "success", analysisTask));
    }
}
