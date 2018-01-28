import { Component, OnInit, SimpleChange, ViewChild, Input, ElementRef } from '@angular/core';

import { init, ECharts, graphic } from 'echarts';

@Component({
    selector: 'jhi-morbidity-chart',
    template: `<div style="height: 500px;width: 100%" #chartContainer></div>`
})

export class MorbidityChartComponent implements OnInit {
    @ViewChild('chartContainer') chartContainer: ElementRef;
    private chart: ECharts;
    private option: any = {
        title: {
            text: '医院体检量',
            textStyle: {
                color: '#73D0CC',
                align: 'center',
                fontSize: 20,
                fontFamily: 'Microsoft YaHei'
            },
            x: 'center'
        },
        legend: {
            data: ['本月体检', '同比平均', '环比平均'],
            type: 'plain',
            show: true,
            top: 30,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: {type: 'category',  axisLine: {lineStyle: {color: '#44C4EE'}}, splitLine: {show: false},
        data: ['宁夏煤炭', '江西西华山', '同煤集团', '河南煤炭', '乌海煤炭', '贵阳矿物局']},
        yAxis: {name: '体检量',  axisLine: {lineStyle: {color: '#44C4EE'}}, type: 'value', splitLine: {show: false}},
        series: [
            {
                name: '本月确诊',
                type: 'bar',
                barWidth: 20,
                data: [87, 75, 91, 63, 45, 12],
                itemStyle: {
                    normal: {
                        color: new graphic.LinearGradient(0, 0, 0, 1,
                            [
                                {offset: 0, color: '#25D9FA'},
                                {offset: 0.5, color: '#1A99D6'},
                                {offset: 1, color: '#106DBB'}
                            ]
                        )
                    }
                }
            },
            {
                name: '同比平均',
                type: 'bar',
                barWidth: 20,
                data: [80, 65, 85, 65, 45, 24]
            },
            {
                name: '环比平均',
                type: 'bar',
                barWidth: 20,
                data: [15, 54, 15, 87, 12, 46]
            }
        ]
    };

    constructor() { }

    ngOnInit() {
        this.chart = init(this.chartContainer.nativeElement);
        this.chart.setOption(this.option);
    }
}
