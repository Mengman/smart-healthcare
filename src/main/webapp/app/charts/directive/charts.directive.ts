import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { EChartOption, init, ECharts } from 'echarts';

@Directive({
    selector: '[jhiEcharts]'
})
export class EchartsDirective implements OnInit {
    @Input('options') options: EChartOption;

    private chart: ECharts;
    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.initChart();
    }

    private initChart() {
        // console.log('option is ' + JSON.stringify(this.options))
        this.chart = init(this.el.nativeElement);
        this.chart.setOption(this.options);
    }
}
