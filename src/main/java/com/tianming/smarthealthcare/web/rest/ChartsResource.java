package com.tianming.smarthealthcare.web.rest;

import com.tianming.smarthealthcare.service.AnalysisTaskService;
import com.tianming.smarthealthcare.web.rest.vm.ExamResultVM;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by yucai on 2018/1/28.
 * Email: yucai.li@hpe.com
 */
@RestController
@RequestMapping("/api/charts")
public class ChartsResource {
    private final Logger log = LoggerFactory.getLogger(AnalysisTaskResource.class);
    private AnalysisTaskService analysisTaskService;

    @Autowired
    public ChartsResource(AnalysisTaskService analysisTaskService) {
        this.analysisTaskService = analysisTaskService;
    }

    @GetMapping("gather")
    public ResponseEntity<Result> examResultGather() {
        ExamResultVM examResultVM = analysisTaskService.countExamResult();
        return ResponseEntity.ok(new Result<>(0, "success", examResultVM));
    }

}
