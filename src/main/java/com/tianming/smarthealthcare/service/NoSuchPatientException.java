package com.tianming.smarthealthcare.service;

public class NoSuchPatientException extends Exception {


    public NoSuchPatientException(String s)
    {
        // Call constructor of parent Exception
        super(s);
    }

    public NoSuchPatientException() {
        super();
    }
}
