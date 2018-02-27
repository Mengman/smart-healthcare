import { Component, OnChanges, ViewChild, ElementRef, Input, SimpleChange } from '@angular/core';

import { init, EChartOption, ECharts, graphic } from 'echarts';

@Component({
    selector: 'jhi-phase-distribution-chart',
    template: `<div style="height: 500px;width: 100%" #chartContainer></div>`
})

export class PhaseDistributionChartComponent implements OnChanges {
    @ViewChild('chartContainer') chartContainer: ElementRef;

    @Input() data: any;
    @Input() provinceName: string;

    public option: any;
    private chart: ECharts;
    private provinceData: Map<string, Array<number>> = new Map();
    constructor() { }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

        if (!this.data) {
            return;
        }

        if (!this.option) {
            this.initOption();
        }

        if (!this.chart) {
            this.chart = init(this.chartContainer.nativeElement);
        }

        let total = 0;

        for (let i = 0; i < this.data.length; i++) {
            total += this.data[i].value[2];
        }

        const chartData = this.updateChartData(total);

        this.option.series[0].data = chartData;
        this.chart.setOption(this.option, true);
    }

    private updateChartData(total: number) {
        const distribution = this.getDataDistribution();

        if (!this.provinceData.has(this.provinceName)) {
            const chartData = [];
            chartData.push({value: Math.round(total * distribution[0]), name: '阴性'});
            chartData.push({value: Math.round(total * distribution[1]), name: '疑似'});
            chartData.push({value: Math.round(total * distribution[2]), name: '一期'});
            chartData.push({value: Math.round(total * distribution[3]), name: '二期'});
            chartData.push({value: Math.round(total * distribution[4]), name: '三期'});
            this.provinceData.set(this.provinceName, chartData);
        }

        return this.provinceData.get(this.provinceName);
    }

    private initOption()  {
        this.option = {
            title: {
                text: '分期统计',
                textStyle: {
                    color: '#73D0CC',
                    align: 'center',
                    fontSize: 20,
                    fontFamily: 'Microsoft YaHei'
                },
                x: 'center'
            },
            series: [
                {
                    name: '分期统计',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '1期'},
                        {value: 310, name: '2期'},
                        {value: 234, name: '3期'}
                    ],
                    label: {
                        normal: {
                            color: '#fff',
                            fontSize: 18
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
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
