package com.tianming.smarthealthcare.web.rest;

import com.tianming.smarthealthcare.domain.Storage;
import com.tianming.smarthealthcare.service.StorageService;
import com.tianming.smarthealthcare.web.rest.vm.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UploadFileResource {

    private final Logger log = LoggerFactory.getLogger(UploadFileResource.class);

    @Autowired
    private StorageService storageService;

    @PostMapping("/files")
    public ResponseEntity<Result> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException{
        log.debug("REST request to upload file : {}", file.getOriginalFilename());
        Storage storage = storageService.store(file);
        return ResponseEntity.ok(new Result(0, "success", storage));
    }

    @GetMapping("/files/{fileId}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable Long fileId) {
        Resource file = storageService.loadAsResource(fileId);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
