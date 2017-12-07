package com.tianming.smarthealthcare.enums;

public enum  AnalysisStatus {
    //0-analyzing, 1-finished
    ANALYSING(0),  //
    FINISHED(1)   //
    ; // semicolon needed when fields / methods follow


    private final int statusCode;

    AnalysisStatus(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return this.statusCode;
    }
}
