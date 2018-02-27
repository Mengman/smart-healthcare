import { Component, OnChanges, ViewChild, Input, ElementRef } from '@angular/core';
import { init, ECharts, graphic } from 'echarts';

import { MapConstants } from '../constants/map.constants';
import { BigMapService } from '../bigmap.service';

@Component({
    selector: 'jhi-mine-corp-chart',
    template: `<div style="height: 500px;width: 100%" #chartContainer></div>`
})

export class MineCorpChartComponent implements OnChanges {
    @ViewChild('chartContainer') chartContainer: ElementRef;
    @Input() provinceName: string;

    private provinceData: Map<string, MineCorpChartData> = new Map();
    private mineCorpList: Array<string> = new Array();
    private chart: ECharts;
    private option: any = {
        title: {
            text: '企业体检量',
            textStyle: {
                color: '#73D0CC',
                align: 'center',
                fontSize: 20,
                fontFamily: 'Microsoft YaHei'
            },
            x: 'center'
        },
        legend: {
            data: ['本月总量', '同比平均', '环比平均'],
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
                name: '一期',
                type: 'bar',
                stack: '本月总量',
                barWidth: 20
            },
            {
                name: '二期',
                type: 'bar',
                stack: '本月总量',
                barWidth: 20
            },
            {
                name: '三期',
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

    constructor(private bigMapService: BigMapService) {
        for (const pName in MapConstants.PROVINCE_MINE) {
            if (MapConstants.PROVINCE_MINE.hasOwnProperty(pName)) {
                this.mineCorpList = this.mineCorpList.concat(MapConstants.PROVINCE_MINE[pName])
            }
        }
     }

     ngOnChanges() {
        if (!this.chart) {
            this.chart = init(this.chartContainer.nativeElement);
        }

        const mineCorp: string[] = [];
        let mineCorpChartData = this.provinceData.get(this.provinceName);
        if ( !mineCorpChartData ) {
            mineCorpChartData = new MineCorpChartData();
            if (this.provinceName === 'china') {
                mineCorpChartData.corpNameList = this.getRandomMineCorp(this.mineCorpList);
                this.generateChartData(200, 500, mineCorpChartData);
            } else {
                const pName = this.bigMapService.convertProvincePinYin2Characters(this.provinceName);
                mineCorpChartData.corpNameList = this.getRandomMineCorp(MapConstants.PROVINCE_MINE[pName])
                this.generateChartData(50, 100, mineCorpChartData);
            }

            this.stripMineCorpName(mineCorpChartData);
            this.provinceData.set(this.provinceName, mineCorpChartData);
        }

        this.option.xAxis.data = mineCorpChartData.corpNameList;
        this.option.series[0].data = mineCorpChartData.negtive;
        this.option.series[1].data = mineCorpChartData.suspected;
        this.option.series[2].data = mineCorpChartData.phaseOne;
        this.option.series[3].data = mineCorpChartData.phaseTwo;
        this.option.series[4].data = mineCorpChartData.phaseThree;
        this.option.series[5].data = mineCorpChartData.yearOnYear;
        this.option.series[6].data = mineCorpChartData.qOq;

        this.chart.setOption(this.option, true);
     }

     private getRandomMineCorp(mineCorps: Array<string>) {
        const amount = 6;
         if (mineCorps.length < amount ) {
             return mineCorps;
         }

        const randomMineCorps: string[] = [];
        for (let i = 0; i < amount; i++) {
            randomMineCorps.push(this.getOneMineCorp(randomMineCorps, mineCorps))
        }

        return randomMineCorps;
     }

     private getOneMineCorp(randomMineCorps: string[], mineCorps: string[]): string {
        const index = this.bigMapService.getRandomInt(0, mineCorps.length - 1);

        if (randomMineCorps.indexOf(mineCorps[index]) !== -1) {
            return this.getOneMineCorp(randomMineCorps, mineCorps);
        } else {
            return mineCorps[index];
        }

     }

     private generateChartData(min: number, max: number, mineCorpChartData: MineCorpChartData) {

        for (let i = 0; i < mineCorpChartData.corpNameList.length; i++ ) {
            const total = this.bigMapService.getRandomInt(min, max);
            const distribution = this.bigMapService.getDataDistribution(5);
            mineCorpChartData.negtive.push(Math.round(total * distribution[0]));
            mineCorpChartData.suspected.push(Math.round(total * distribution[1]));
            mineCorpChartData.phaseOne.push(Math.round(total * distribution[2]));
            mineCorpChartData.phaseTwo.push(Math.round(total * distribution[3]));
            mineCorpChartData.phaseThree.push(Math.round(total * distribution[4]));
            mineCorpChartData.yearOnYear.push(Math.round(total * this.bigMapService.getRandomArbitrary(0.1, 1.5)));
            mineCorpChartData.qOq.push(Math.round(total * this.bigMapService.getRandomArbitrary(0.1, 1.5)));
        }
        return mineCorpChartData;
     }

     private stripMineCorpName(mineCorpChartData: MineCorpChartData) {
        for (let i = 0; i < mineCorpChartData.corpNameList.length; i++) {
            const corpName = mineCorpChartData.corpNameList[i];
            if (corpName.length > 7) {
                mineCorpChartData.corpNameList[i] = corpName.substring(0, 3) + '..' + corpName.substring(corpName.length - 2, corpName.length);
            }
        }
     }
}

class MineCorpChartData {
    corpNameList: Array<string> = new Array();
    negtive: Array<number> = new Array();
    suspected: Array<number> = new Array();
    phaseOne: Array<number> = new Array();
    phaseTwo: Array<number> = new Array();
    phaseThree: Array<number> = new Array();
    yearOnYear: Array<number> = new Array();
    qOq: Array<number> = new Array();
}
