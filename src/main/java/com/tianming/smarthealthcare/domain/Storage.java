package com.tianming.smarthealthcare.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "file")
public class Storage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName;
    private String fileName;
    private String fileRelativePath;

    public Storage() {
    }

    public Storage(String originalName, String filelName, String fileRelativePath) {
        this.originalName = originalName;
        this.fileName = filelName;
        this.fileRelativePath = fileRelativePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String filelName) {
        this.fileName = filelName;
    }

    public String getFileRelativePath() {
        return fileRelativePath;
    }

    public void setFileRelativePath(String fileRelativePath) {
        this.fileRelativePath = fileRelativePath;
    }
}
