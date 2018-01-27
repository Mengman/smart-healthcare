import { Component, OnChanges, SimpleChange, ViewChild, Input, ElementRef } from '@angular/core';

import { init, EChartOption, ECharts, graphic } from 'echarts';

@Component({
    selector: 'jhi-top-ten-bar-chart',
    template: `<div style="height: 500px;width: 100%" #chartContainer></div>`
})

export class TopTenBarChartComponent implements OnChanges {
    @ViewChild('chartContainer') chartContainer: ElementRef;
    public toptenOption: any;

    @Input() cityNames: string[];
    @Input() cityValues: number[];

    private chart: ECharts;
    constructor() { }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (!this.toptenOption) {
            this.initOption()
        }
        this.updateOption();
        if (!this.chart) {
            this.chart = init(this.chartContainer.nativeElement);
        }

        this.chart.setOption(this.toptenOption, true)
    }

    private initOption(): void {
        this.toptenOption =  {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            title: {
                text: '体检量(地区) Top10',
                textStyle: {
                    color: '#73D0CC',
                    align: 'center',
                    fontSize: 20,
                    fontFamily: 'Microsoft YaHei'
                },
                x: 'center'
            },
            legend: {
                top: '10%',
                data: ['阴性', '疑似', '一期', '二期', '三期'],
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                top: '20%',
                containLabel: true
            },
            xAxis: { type: 'value', axisLine: {lineStyle: {color: '#44C4EE'}}, boundaryGap: [0, 0.01], position: 'top', splitLine: {show: false} },
            yAxis: { type: 'category', axisLine: {lineStyle: {color: '#44C4EE'}},
            data: ['南通', '本溪', '绵阳', '北京', '句容', '秦皇岛', '南充', '枣庄', '唐山', '平顶山']
            },
            series: [
                {
                    name: '阴性',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20
                },
                {
                    name: '疑似',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20
                },
                {
                    name: '一期',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20
                },
                {
                    name: '二期',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20
                },
                {
                    name: '三期',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20
                }
            ]
        };
    }

    private updateOption(): void {
        this.toptenOption.yAxis.data = this.cityNames;
        const negative = [];
        const undecision = [];
        const phaseOne = [];
        const phaseTwo = [];
        const phaseThree = [];
        for (let i = 0; i < this.cityNames.length; i++) {
            const distribution = this.getDataDistribution();
            const val = this.cityValues[i];
            negative[i] = Math.round(val * distribution[0]);
            undecision[i] = Math.round(val * distribution[1]);
            phaseOne[i] = Math.round(val * distribution[2]);
            phaseTwo[i] = Math.round(val * distribution[3]);
            phaseThree[i] = Math.round(val * distribution[4]);
        }

        this.toptenOption.series[0].data = negative;
        this.toptenOption.series[1].data = undecision;
        this.toptenOption.series[2].data = phaseOne;
        this.toptenOption.series[3].data = phaseTwo;
        this.toptenOption.series[4].data = phaseThree;
    }

    private getDataDistribution() {
        const distribution = [];
        let total = 0;
        for (let i = 0; i < 4; i++) {
            const random = this.getRandomArbitrary(0, 1 - total);
            total += random;
            distribution.push(random)
        }

        distribution[4] = Number.parseFloat((1 - total).toFixed(3));
        return distribution;
    }

    private getRandomArbitrary(min, max): number {
        return Number.parseFloat((Math.random() * (max - min) + min).toFixed(3));
    }
}
