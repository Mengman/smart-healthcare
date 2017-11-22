package com.tianming.smarthealthcare.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.security.SecurityUtils;
import com.tianming.smarthealthcare.service.AnalysisTaskService;
import com.tianming.smarthealthcare.service.NoSuchPatientException;
import com.tianming.smarthealthcare.web.rest.vm.AnalysisTaskVM;
import com.tianming.smarthealthcare.web.rest.vm.DiagnoseTaskVM;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.NoSuchFileException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AnalysisTaskResource {

    private final Logger log = LoggerFactory.getLogger(AnalysisTaskResource.class);

    @Autowired
    private AnalysisTaskService analysisTaskService;

    @PostMapping("/task")
    @Timed
    public ResponseEntity<Result> createTask(@RequestBody AnalysisTaskVM analysisTaskVM) throws NoSuchPatientException, NoSuchFileException {
        log.debug("REST request to create analysis task : {}", analysisTaskVM);
        AnalysisTask savedAnalysisTask = analysisTaskService.create(analysisTaskVM);
        return ResponseEntity.ok(new Result(0, "success", savedAnalysisTask));
    }

    @PutMapping("/task")
    @Timed
    public ResponseEntity<Result> modifyTask(@RequestBody DiagnoseTaskVM diagnoseTaskVM){
        log.debug("REST request to modify analysis task : {}", diagnoseTaskVM);
        AnalysisTask savedAnalysisTask = analysisTaskService.modify(diagnoseTaskVM);
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
