package com.tianming.smarthealthcare.web.rest.vm;

/**
 * Created by yucai on 2018/1/28.
 * Email: yucai.li@hpe.com
 */
public class ExamResultVM {
    private Long totalTask;
    private Long suspected;
    private Long confirmed;

    private Long todayTask;
    private Long todaySuspected;
    private Long todayConfirmed;

    public ExamResultVM() {
    }

    public Long getTotalTask() {
        return totalTask;
    }

    public void setTotalTask(Long totalTask) {
        this.totalTask = totalTask;
    }

    public Long getSuspected() {
        return suspected;
    }

    public void setSuspected(Long suspected) {
        this.suspected = suspected;
    }

    public Long getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Long confirmed) {
        this.confirmed = confirmed;
    }

    public Long getTodayTask() {
        return todayTask;
    }

    public void setTodayTask(Long todayTask) {
        this.todayTask = todayTask;
    }

    public Long getTodaySuspected() {
        return todaySuspected;
    }

    public void setTodaySuspected(Long todaySuspected) {
        this.todaySuspected = todaySuspected;
    }

    public Long getTodayConfirmed() {
        return todayConfirmed;
    }

    public void setTodayConfirmed(Long todayConfirmed) {
        this.todayConfirmed = todayConfirmed;
    }
}
