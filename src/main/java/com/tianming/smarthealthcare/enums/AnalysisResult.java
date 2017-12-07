package com.tianming.smarthealthcare.enums;

public enum AnalysisResult {
    NEGATIVE(0),  //
    PHASE1(1),
    PHASE2(2),
    PHASE3(3)
    ; // semicolon needed when fields / methods follow


    private final int code;

    AnalysisResult(int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }
}
