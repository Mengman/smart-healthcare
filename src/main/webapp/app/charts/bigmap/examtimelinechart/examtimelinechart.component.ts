import { Component, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';

import { init, ECharts } from 'echarts';

import { MapConstants } from '../constants/map.constants';

@Component({
    selector: 'jhi-exam-time-chart',
    template: `<div style="height: 500px;width: 100%" #chartContainer></div>`
})

export class ExamTimeChartComponent implements OnChanges {
    @ViewChild('chartContainer') chartContainer: ElementRef;

    @Input() provinceName: string;

    private chart: ECharts;
    private option: any;

    private provinceData: Map<string, any> = new Map();

    constructor() { }

    ngOnChanges() {
        if (!this.option) {
            this.initOption();
        }

        if (!this.chart) {
            this.chart = init(this.chartContainer.nativeElement);
        }

        const data = this.generateData();
        this.option.series[0].data = data['negative'];
        this.option.series[1].data = data['undecision'];
        this.option.series[2].data = data['phaseOne'];
        this.option.series[3].data = data['phaseTwo'];
        this.option.series[4].data = data['phaseThree'];

        if (this.provinceName === 'china') {
            this.option.title.text = '全国体检图';
        } else {
            for (const pName in MapConstants.NAME_MAP) {
                if (MapConstants.NAME_MAP[pName] === this.provinceName) {
                    this.option.title.text = pName + '体检图';
                }
            }
        }

        this.chart.setOption(this.option, true);

     }

     private initOption() {
         const date = this.getTwoYearsDate();
         this.option = {
            title: {
                text: '全国体检图',
                textStyle: {
                    color: '#73D0CC',
                    align: 'center',
                    fontSize: 20,
                    fontFamily: 'Microsoft YaHei'
                },
                x: 'center'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                top: '10%',
                textStyle: {
                    color: '#fff'
                },
                data: ['阴性', '待确认', '一期', '二期', '三期']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                top: '20%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {lineStyle: {color: '#44C4EE'}},
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {lineStyle: {color: '#44C4EE'}}
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: 90,
                end: 100
            }, {
                type: 'slider',
                start: 90,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series : [
                {
                    name: '阴性',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '待确认',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '一期',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '二期',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '三期',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
         }
     }

     private getTwoYearsDate(): Array<string> {
        let base = +new Date(2016, 1, 25);
        const oneDay = 24 * 3600 * 1000;
        const date = [];
        for (let i = 1; i < 730; i++) {
            const now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        }

        return date;
     }

     private generateData(): Map<string, any> {
        if (!this.provinceData.has(this.provinceName)) {

            const negative = [];
            const undecision = [];
            const phaseOne = [];
            const phaseTwo = [];
            const phaseThree = [];

            for (let i = 0; i < 730; i++) {
                const amount = this.generateExamAmount(i);
                const distribution = this.getDataDistribution();

                negative.push(Math.round(amount * distribution[0]));
                undecision.push(Math.round(amount * distribution[1]));
                phaseOne.push(Math.round(amount * distribution[2]));
                phaseTwo.push(Math.round(amount * distribution[3]));
                phaseThree.push(Math.round(amount * distribution[4]));
            }

            this.provinceData.set(this.provinceName, {
                'negative': negative,
                'undecision': undecision,
                'phaseOne': phaseOne,
                'phaseTwo': phaseTwo,
                'phaseThree': phaseThree
            });
        }
        return this.provinceData.get(this.provinceName);
     }

     private generateExamAmount(day: number): number {
         day = day % 365;
         let amount = 0;
         let min = 1;
         let max = 100;
        if (day < 90) {
            min *= 0.2;
            max *= 0.2
        } else if (day > 180) {
            min *= 1.5;
            max *= 1.5
        }

        amount = this.getRandomInt(min, max);

        if (this.provinceName === 'china') {
            amount *= 20;
        }

        return amount;
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

    private getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
