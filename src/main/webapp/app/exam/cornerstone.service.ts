import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';

declare const cornerstone: any;
declare const cornerstoneWADOImageLoader: any;

@Injectable()

export class CornerstoneService {

  constructor() {
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath : '/cornerstone/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask' : {
          codecsPath: '/cornerstone/cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });

  }

  fetchDicomImage(url: string): Observable<any> {
    console.log(`fetching ${url}`)
    return Observable.fromPromise(cornerstone.loadAndCacheImage(`wadouri:${url}`)).first();

  }

}
