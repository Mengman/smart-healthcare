package com.tianming.smarthealthcare.domain;

import javax.persistence.*;

@Entity
public class Demo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String demoName;
    private Integer demoResult;

    public Demo() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDemoName() {
        return demoName;
    }

    public void setDemoName(String demoName) {
        this.demoName = demoName;
    }

    public Integer getDemoResult() {
        return demoResult;
    }

    public void setDemoResult(Integer demoResult) {
        this.demoResult = demoResult;
    }
}
