import { Injectable } from '@angular/core';
import { MapConstants } from './constants/map.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ExamGatherResult, ExamGatherResultData } from './model/examgatherresult';

@Injectable()
export class BigMapService {

    constructor(private http: HttpClient) { }

    public getDataDistribution(length: number) {
        const distribution = [];
        let total = 0;
        for (let i = 0; i < length - 1; i++) {
            const random = this.getRandomArbitrary(0, 1 - total);
            total += random;
            distribution.push(random)
        }

        distribution[length - 1] = Number.parseFloat((1 - total).toFixed(3));
        return distribution;
    }

    public getExamGatherResult(): Observable<ExamGatherResult> {
        return this.http.get<ExamGatherResult>('/api/charts/gather');
    }

    public getRandomArbitrary(min, max): number {
        return Number.parseFloat((Math.random() * (max - min) + min).toFixed(3));
    }

    public getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public convertProvincePinYin2Characters(pinyin: string): string {
        let provinceName = '';
        for (const pName in MapConstants.NAME_MAP) {
            if (MapConstants.NAME_MAP[pName] === pinyin) {
                provinceName = pName;
            }
        }
        return provinceName;
    }
}
