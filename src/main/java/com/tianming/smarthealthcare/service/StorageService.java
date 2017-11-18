package com.tianming.smarthealthcare.service;

import com.tianming.smarthealthcare.config.ApplicationProperties;
import com.tianming.smarthealthcare.domain.Storage;
import com.tianming.smarthealthcare.repository.StorageRepository;
import org.apache.commons.io.FilenameUtils;
import liquibase.util.file.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Transactional
public class StorageService {
    private final Logger log = LoggerFactory.getLogger(StorageService.class);

    private String uploadDir;
    private StorageRepository storageRepository;

    @Autowired
    public StorageService(ApplicationProperties applicationProperties, StorageRepository storageRepository) {
        this.uploadDir = applicationProperties.getUploadDir();
        this.storageRepository = storageRepository;
    }

    public Storage store(MultipartFile file) throws IOException{
        String uuid = UUID.randomUUID().toString();
<<<<<<< HEAD
        String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
        String newFileName = uuid + "." + fileExt;
        File dir = new File(uploadDir);
        if (!dir.exists() && !dir.mkdirs()) {
            log.error("Can not create file upload dir: " + uploadDir);
            return null;
        }
        Files.copy(file.getInputStream(), Paths.get(uploadDir, newFileName));
        Storage storage = new Storage(file.getOriginalFilename(), newFileName, newFileName);
=======
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        String filename = uuid + "." + extension;
        Files.copy(file.getInputStream(), Paths.get(uploadDir, filename));
        Storage storage = new Storage(file.getOriginalFilename(), filename, filename);
>>>>>>> 4ac47216ef299b44030c6adeee404d620439a763
        return storageRepository.save(storage);
    }

    public Resource loadAsResource(Long fileId) {
        Storage storage = storageRepository.findOne(fileId);
        return new FileSystemResource(new File(Paths.get(uploadDir, storage.getFileRelativePath()).toAbsolutePath().toString()));
    }


}
