package com.tianming.smarthealthcare.web.rest;

import com.tianming.smarthealthcare.domain.AnalysisTask;
import com.tianming.smarthealthcare.domain.Storage;
import com.tianming.smarthealthcare.service.DicomParserService;
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

@RestController
@RequestMapping("/api")
public class UploadFileResource {

    private final Logger log = LoggerFactory.getLogger(UploadFileResource.class);

    private StorageService storageService;
    private DicomParserService dicomParserService;

    @Autowired
    public UploadFileResource(StorageService storageService, DicomParserService dicomParserService) {
        this.storageService = storageService;
        this.dicomParserService = dicomParserService;
    }

    @PostMapping("/files")
    public ResponseEntity<Result> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException{
        log.debug("REST request to upload file : {}", file.getOriginalFilename());
        Storage storage = storageService.store(file);
        return ResponseEntity.ok(new Result(0, "success", storage));
    }

    @GetMapping("/files/{fileId}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable Long fileId) throws IOException {
        Resource file = storageService.loadAsResource(fileId);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"")
            .contentLength(file.contentLength())
            .body(file);
    }

    @PostMapping("/dicomParse")
    public ResponseEntity<Result> handleDicomParse(@RequestParam("file") MultipartFile file) throws IOException{
        log.debug("REST request to upload file : {}", file.getOriginalFilename());
        AnalysisTask task = dicomParserService.parseAndSave(file);
        return ResponseEntity.ok(new Result(0, "success", task));
    }

    @PostMapping("/dicomParse/{login}")
    public ResponseEntity<Result> handleDicomParse(@RequestParam("file") MultipartFile file, @PathVariable("login") String login) throws IOException{
        log.debug("REST request to upload file : {}", file.getOriginalFilename());
        AnalysisTask task = dicomParserService.parseAndSave(file, login);
        return ResponseEntity.ok(new Result(0, "success", task));
    }
}
