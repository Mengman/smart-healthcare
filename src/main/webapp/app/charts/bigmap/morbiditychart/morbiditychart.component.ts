import { Component, OnInit, SimpleChange, ViewChild, Input, ElementRef } from '@angular/core';

import { init, ECharts, graphic } from 'echarts';
import { BigMapService } from '../bigmap.service';

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
            data: ['阴性', '疑似', '阳性', '同比平均', '环比平均'],
            type: 'plain',
            show: true,
            top: 30,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: {type: 'category',  axisLine: {lineStyle: {color: '#44C4EE'}}, splitLine: {show: false},
        data: ['北京煤炭总医院', '江西西华山', '同煤集团', '河南煤炭', '乌海煤炭', '贵阳矿物局']},
        yAxis: {name: '体检量',  axisLine: {lineStyle: {color: '#44C4EE'}}, type: 'value', splitLine: {show: false}},
        series: [
            {
                name: '阴性',
                type: 'bar',
                stack: '本月总量',
                barWidth: 20
            },
            {
                name: '疑似',
                type: 'bar',
                stack: '本月总量',
                barWidth: 20
            },
            {
                name: '阳性',
                type: 'bar',
                stack: '本月总量',
                barWidth: 20
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

    constructor(private bigMapService: BigMapService) { }
    ngOnInit() {
        this.bigMapService.getExamGatherResult().subscribe((result) => {
            const confirmed = result.data.confirmed;
            const suspected = result.data.suspected;
            const negtive = result.data.totalTask - suspected - confirmed;

            const negtiveData = this.generateMockData();
            negtiveData[0] = negtive;

            const suspectedData = this.generateMockData();
            suspectedData[0] = suspected;

            const confirmedData = this.generateMockData();
            confirmedData[0] = confirmed;

            this.option.series[0].data = negtiveData;
            this.option.series[1].data = suspectedData;
            this.option.series[2].data = confirmedData;

            this.chart = init(this.chartContainer.nativeElement);
            this.chart.setOption(this.option);

        })
    }

    private generateMockData(): Array<number> {
        const mockData = new Array<number>();
        for (let i = 0; i < this.option.xAxis.data.length; i++) {
            mockData[i] = this.bigMapService.getRandomInt(80, 200);
        }
        return mockData;
    }
}
