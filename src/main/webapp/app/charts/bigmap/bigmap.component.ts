import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { init, EChartOption, ECharts, registerMap, graphic } from 'echarts';
import { EchartsDirective } from '../directive/charts.directive';

import { MapConstants } from './constants/map.constants';

@Component({
    selector: 'jhi-bigmap',
    templateUrl: 'bigmap.component.html',
    styleUrls: ['bigmap.scss']
})
export class BigmapComponent implements OnInit {

    private geoCoordMap = MapConstants.GEO_COORD_MAP;

    public countryDisplay = 'block'
    public provinceDisplay = 'none';
    public option: any;
    public provinceMapOption: any;

    public topTenCityName: string[] = [];
    public topTenCityValue: number[] = [];

    public phaseChartData: any;
    public phaseChartProvinceName: string;

    private chartData: any;
    private chinaChart: ECharts;
    private provinceChart: ECharts;

    @ViewChild('provinceChart') provinceChartEle: ElementRef;
    @ViewChild('chinaChart') chinaChartEle: ElementRef;

    constructor(private http: HttpClient) {}

    private findTopTenData(data: any) {
        let count = 0;
        const topTenCityName = [];
        const topTenCityValue = [];
        for (let i = data.length - 1 ; i >= 0 && count++ < 10 ; i-- ) {
            topTenCityName.push(data[i].name);
            topTenCityValue.push(data[i].value[2]);
        }

        topTenCityName.reverse();
        topTenCityValue.reverse();

        this.topTenCityName = topTenCityName;
        this.topTenCityValue = topTenCityValue;
    }

    ngOnInit() {
        this.chartData = this.convertData();
        this.updatePhaseChartData('china', this.chartData);

        this.chartData.sort((a, b) => a.value[2] - b.value[2])

        this.findTopTenData(this.chartData);

        this.http.get('/map/china.json').subscribe((chinaMap) => {
            registerMap('china', chinaMap);

            this.option = {
                title: {
                    text: '全国职业性尘肺病发病图',
                    textStyle: {
                        color: '#73D0CC',
                        align: 'center',
                        fontSize: 30,
                        fontFamily: 'Microsoft YaHei'
                    },
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => params.name + ' : ' + params.value[2]
                },
                geo: {
                    map: 'china',
                    zoom: 1.3,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#44C4EE'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    },
                    nameMap: MapConstants.NAME_MAP
                },
                visualMap: {
                    min: 0,
                    max: 200,
                    calculable: true,
                    inRange: {
                        color: ['#50a3ba', '#eac736', '#d94e5d']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: 'lung map',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: this.chartData,
                        symbolSize: (val) => val[2] / 10 ,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    }
                ]
            }
            this.chinaChart = init(this.chinaChartEle.nativeElement);
            this.chinaChart.on('click', (result) => {
                this.displayProvinceMap(result.name)
            })
            this.chinaChart.setOption(this.option);
        })
    }

    private convertData() {
        const res = [];

        for (const city in this.geoCoordMap) {

            if (this.geoCoordMap.hasOwnProperty(city)) {
                const geoCoord = this.geoCoordMap[city]
                if (geoCoord) {
                    res.push({
                        name: city,
                        value: geoCoord.concat(this.randomData())
                    })
                }
            }
        }
        return res;
    }

    private randomData() {
        return Math.round(Math.random() * 200);
    }

    private displayProvinceMap(provinceName: string) {
        this.provinceDisplay = 'block';
        this.countryDisplay = 'none'

        if (!this.provinceMapOption) {
            this.initProvinceMapOption();
        }

        this.http.get('/map/' + provinceName + '.json').subscribe((provinceMap) => {
            registerMap(provinceName, provinceMap);

            const provinceChartData = this.updateProvinceData(provinceName);
            this.updatePhaseChartData(provinceName, provinceChartData);

            this.provinceMapOption.geo.map = provinceName;
            this.provinceMapOption.series[0].data = provinceChartData;
            this.updateTopTenChartData(provinceChartData);

            if (!this.provinceChart) {
                this.provinceChart = init(this.provinceChartEle.nativeElement);

                this.provinceChart.on('click', () => {
                    this.showCountryMap()
                })
            }

            for (const pName in MapConstants.NAME_MAP) {
                if (MapConstants.NAME_MAP[pName] === provinceName) {
                    this.provinceMapOption.title.text = pName + '职业性尘肺病发病图';
                }
            }

            this.provinceChart.setOption(this.provinceMapOption, true);

        })

    }

    private initProvinceMapOption() {
        this.provinceMapOption = {
            title: {
                text: '全国职业性尘肺病发病图',
                textStyle: {
                    color: '#73D0CC',
                    align: 'center',
                    fontSize: 30,
                    fontFamily: 'Microsoft YaHei'
                },
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => params.name + ' : ' + params.value[2]
            },
            geo: {
                map: 'china',
                zoom: 1,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#44C4EE'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
            },
            visualMap: {
                min: 0,
                max: 200,
                calculable: true,
                inRange: {
                    color: ['#50a3ba', '#eac736', '#d94e5d']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name: 'lung map',
                    type: 'scatter',
                    data: this.chartData,
                    coordinateSystem: 'geo',
                    symbolSize: (val) => val[2] / 10 ,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                }
            ]
        }
    }

    private showCountryMap() {
        this.countryDisplay = 'block';
        this.provinceDisplay = 'none';
        this.updatePhaseChartData('china', this.chinaChart);
        this.findTopTenData(this.chartData);
    }

    private updateProvinceData(provincePinYin) {
        let provinceName = '';
        for (const pName in MapConstants.NAME_MAP) {
            if (MapConstants.NAME_MAP[pName] === provincePinYin) {
                provinceName = pName;
            }
        }

        const provinceChartData = [];
        for (let i = 0; i < this.chartData.length - 1; i++) {
            const cityData =  this.chartData[i];
            if (MapConstants.PROVINCE_CITY[provinceName].indexOf(cityData.name) !== -1) {
                provinceChartData.push(cityData);
            }
        }

        return provinceChartData;
    }

    private updateTopTenChartData(provinceChartData: any) {
        provinceChartData.sort((a, b) => a.value[2] - b.value[2])
        this.findTopTenData(provinceChartData);
    }

    private updatePhaseChartData(provinceName: string, data: any) {
        this.phaseChartData = data;
        this.phaseChartProvinceName = provinceName;
    }
}
