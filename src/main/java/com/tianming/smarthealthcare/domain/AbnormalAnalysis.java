package com.tianming.smarthealthcare.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by ycli on 31/08/18.
 */
@Entity
public class AbnormalAnalysis implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 肺不张
    private Double atelectasis;
    // 心脏肥大
    private Double cardiomegaly;
    // 实变
    private Double consolidation;
    // 水肿
    private Double edema;
    // 渗出
    private Double effusion;
    // 肺气肿
    private Double emphysema;
    // 纤维化
    private Double fibrosis;
    // 疝气
    private Double hernia;
    // 渗透物
    private Double infiltration;
    // 团块
    private Double mass;
    // 结节
    private Double nodule;
    // 胸膜增厚
    private Double pleuralThickening;
    // 肺炎
    private Double pneumonia;
    // 气胸
    private Double pneumothorax;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAtelectasis() {
        return atelectasis;
    }

    public void setAtelectasis(Double atelectasis) {
        this.atelectasis = atelectasis;
    }

    public Double getCardiomegaly() {
        return cardiomegaly;
    }

    public void setCardiomegaly(Double cardiomegaly) {
        this.cardiomegaly = cardiomegaly;
    }

    public Double getConsolidation() {
        return consolidation;
    }

    public void setConsolidation(Double consolidation) {
        this.consolidation = consolidation;
    }

    public Double getEdema() {
        return edema;
    }

    public void setEdema(Double edema) {
        this.edema = edema;
    }

    public Double getEffusion() {
        return effusion;
    }

    public void setEffusion(Double effusion) {
        this.effusion = effusion;
    }

    public Double getEmphysema() {
        return emphysema;
    }

    public void setEmphysema(Double emphysema) {
        this.emphysema = emphysema;
    }

    public Double getFibrosis() {
        return fibrosis;
    }

    public void setFibrosis(Double fibrosis) {
        this.fibrosis = fibrosis;
    }

    public Double getHernia() {
        return hernia;
    }

    public void setHernia(Double hernia) {
        this.hernia = hernia;
    }

    public Double getInfiltration() {
        return infiltration;
    }

    public void setInfiltration(Double infiltration) {
        this.infiltration = infiltration;
    }

    public Double getMass() {
        return mass;
    }

    public void setMass(Double mass) {
        this.mass = mass;
    }

    public Double getNodule() {
        return nodule;
    }

    public void setNodule(Double nodule) {
        this.nodule = nodule;
    }

    public Double getPleuralThickening() {
        return pleuralThickening;
    }

    public void setPleuralThickening(Double pleuralThickening) {
        this.pleuralThickening = pleuralThickening;
    }

    public Double getPneumonia() {
        return pneumonia;
    }

    public void setPneumonia(Double pneumonia) {
        this.pneumonia = pneumonia;
    }

    public Double getPneumothorax() {
        return pneumothorax;
    }

    public void setPneumothorax(Double pneumothorax) {
        this.pneumothorax = pneumothorax;
    }
}
