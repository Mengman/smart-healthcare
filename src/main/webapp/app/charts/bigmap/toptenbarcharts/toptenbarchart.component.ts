import { Component, OnChanges, SimpleChange, ViewChild, Input, ElementRef } from '@angular/core';

import { init, EChartOption, ECharts, graphic } from 'echarts';

@Component({
    selector: 'jhi-top-ten-bar-chart',
    template: `<div class="col-12" style="height: 400px;width: 500px" #chartContainer></div>`
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
        this.chart = init(this.chartContainer.nativeElement);
        this.chart.setOption(this.toptenOption, true)
    }

    private initOption(): void {
        this.toptenOption =  {
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
            xAxis: { type: 'value', axisLine: {lineStyle: {color: '#44C4EE'}}, boundaryGap: [0, 0.01], position: 'top', splitLine: {show: false} },
            yAxis: { type: 'category', axisLine: {lineStyle: {color: '#44C4EE'}},
            data: ['南通', '本溪', '绵阳', '北京', '句容', '秦皇岛', '南充', '枣庄', '唐山', '平顶山']
            },
            series: [
                {
                    name: 'top 10',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: [69, 71, 74, 76, 82, 86, 87, 89, 95, 99],
                    barWidth: 20,
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
                }
            ]
        };
    }

    private updateOption(): void {
        this.toptenOption.yAxis.data = this.cityNames;
        this.toptenOption.series[0].data = this.cityValues;
    }
}
