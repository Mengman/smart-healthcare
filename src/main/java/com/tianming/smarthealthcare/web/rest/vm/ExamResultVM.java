package com.tianming.smarthealthcare.web.rest.vm;

/**
 * Created by yucai on 2018/1/28.
 * Email: yucai.li@hpe.com
 */
public class ExamResultVM {
    private int suspected;
    private int confirmed;

    public ExamResultVM(int suspected, int confirmed) {
        this.suspected = suspected;
        this.confirmed = confirmed;
    }

    public int getSuspected() {
        return suspected;
    }

    public void setSuspected(int suspected) {
        this.suspected = suspected;
    }

    public int getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(int confirmed) {
        this.confirmed = confirmed;
    }
}
