import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';

import { AnalysisTask } from '../model/analysis-task';
import { ExamTaskDetailService } from './detail.service';
import { CornerstoneService } from '../cornerstone.service';
import { fail } from 'assert';
declare const cornerstone;
declare const cornerstoneTools;

@Component({
    selector: 'jhi-exam-detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.style.scss']
})

export class ExamDetailComponent implements OnInit {
    @ViewChild('dcmEle') dcmEle: ElementRef;
    @ViewChild('fullDcmEle') fullDcmEle: ElementRef;
    public task: AnalysisTask;
    public analysisResult: string;
    public currentIndex = 0;
    public imageList = [];
    public imageData: any;
    public fullScreenBtn = false;
    public imgLoading = true;
    public showSubmitAlert = false;
    public diagnosis: AnalysisTask = new AnalysisTask();

    constructor(
        private route: ActivatedRoute,
        private taskDetailService: ExamTaskDetailService,
        public cornerstoneService: CornerstoneService,
    ) {}

    ngOnInit() {

        this.route.paramMap.switchMap(
            (params: ParamMap) => this.taskDetailService.getTask(params.get('id'))
        ).subscribe((data) => {
            this.task = data;
            if (!this.task.xrayId) {
              this.imgLoading = false;
            }
            this.diagnosis.id = data.id;
            this.diagnosis.diagnosisResult = data.diagnosisResult;
            this.diagnosis.diagnosisComment = data.diagnosisComment;
            this.analysisResultConvert(data);
            this.initImage(this.task.xrayId);
        });
    }

    public saveDiagnosis() {
      this.taskDetailService.saveDiagnosis(this.diagnosis)
      .then((isSuccess) => this.showSubmitAlert = isSuccess);
    }

    private analysisResultConvert(task: AnalysisTask) {
        if (task.analysisResult) {
            switch (task.analysisResult) {
                case 0:
                    this.analysisResult = '无尘肺';
                    break;
                case 1:
                    this.analysisResult = '尘肺一期';
                    break;
                case 2:
                    this.analysisResult = '尘肺二期';
                    break;
                case 3:
                    this.analysisResult = '尘肺三期';

            }
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (this.dcmEle) {
        cornerstone.resize(this.dcmEle.nativeElement, true);
      }else if (this.fullDcmEle) {
        cornerstone.resize(this.fullDcmEle.nativeElement, true);
      }
    }

    @HostListener('mousewheel', ['$event'])
    onMouseWheel(event) {
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

      if (delta > 0) {
        this.currentIndex++;
        if (this.currentIndex > this.imageList.length) {
          this.currentIndex = this.imageList.length - 1;
        }
      } else {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        }
      }
    }

    initImage(fileName) {
        console.log('this.dcmEle: ' + JSON.stringify(this.dcmEle))
        cornerstone.enable(this.dcmEle.nativeElement);

        this.cornerstoneService.fetchDicomImage(`/api/files/` + fileName)
          .subscribe((res) => {
            this.imageData = res;
            if (this.imageData) {
              this.imgLoading = false;
              if (!this.imageList.filter((img) => img.imageId === this.imageData.imageId).length) {
                this.imageList.push(this.imageData);
              }

              if (this.imageData.imageId) {
                this.activeDcm(this.dcmEle.nativeElement, this.imageData);
              }

            }
          });

    }

    reviewFullScreen() {
        this.fullScreenBtn = true;
        setTimeout(() => {
          cornerstone.enable(this.fullDcmEle.nativeElement);

          this.cornerstoneService.fetchDicomImage(`/api/files/` + this.task.xrayId)
            .subscribe((res) => {
              this.imageData = res;
              if (this.imageData) {

                if (!this.imageList.filter((img) => img.imageId === this.imageData.imageId).length) {
                  this.imageList.push(this.imageData);
                }

                if (this.imageData.imageId) {
                  this.activeDcm(this.fullDcmEle.nativeElement, this.imageData);
                  this.dcmDescripe();
                }
              }
            });
        }, 0)
      }

      dcmDescripe() {
        $('#columns').text(this.imageData.data.uint16('x00280011'));
        $('#rows').text(this.imageData.data.uint16('x00280010'));
      }

      activeDcm(ele, imageData) {
        cornerstone.displayImage(ele, imageData);
        console.log(imageData);
        cornerstoneTools.mouseInput.enable(ele);
        cornerstoneTools.mouseWheelInput.enable(ele);

        // Enable all tools we want to use with this ele
        cornerstoneTools.wwwc.activate(ele, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(ele, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(ele, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.zoomWheel.activate(ele); // zoom is the default tool for middle mouse wheel
        cornerstoneTools.addStackStateManager(ele, ['playClip']);
        // cornerstoneTools.addToolState(ele, 'stack',0);

        cornerstoneTools.stackScrollWheel.activate(ele);
        cornerstoneTools.stackPrefetch.enable(ele);
      }

      getTransferSyntax() {
        return this.imageData.data.string('x00020010');
      }

      getSopClass() {
        return this.imageData.data.string('x00080016');
      }

      getPixelRepresentation() {
        const value = this.imageData.data.uint16('x00280103');
        if (value === undefined) {
          return;
        }
        return value + (value === 0 ? ' (unsigned)' : ' (signed)');
      }

      getPlanarConfiguration() {
        const value = this.imageData.data.uint16('x00280006');
        if (value === undefined) {
          return;
        }
        return value + (value === 0 ? ' (pixel)' : ' (plane)');
      }

      backDetail() {
        this.fullScreenBtn = false;
        setTimeout(() => {
          this.initImage('im1.dcm');
        }, 0);
      }

      wwWl() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        cornerstoneTools.wwwc.activate(this.fullDcmEle.nativeElement, 1);
        cornerstoneTools.wwwcTouchDrag.activate(this.fullDcmEle.nativeElement);
      }

      inverseColor() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        const viewport = cornerstone.getViewport(this.fullDcmEle.nativeElement);
        if (viewport.invert === true) {
          viewport.invert = false;
        } else {
          viewport.invert = true;
        }
        cornerstone.setViewport(this.fullDcmEle.nativeElement, viewport);
      }

      zoom() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        cornerstoneTools.zoom.activate(this.fullDcmEle.nativeElement, 5); // 5 is right mouse button and left mouse button
        cornerstoneTools.zoomTouchDrag.activate(this.fullDcmEle.nativeElement);
      }

      pan() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        cornerstoneTools.pan.activate(this.fullDcmEle.nativeElement, 3); // 3 is middle mouse button and left mouse button
        cornerstoneTools.panTouchDrag.activate(this.fullDcmEle.nativeElement);
      }

      scroll() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        cornerstoneTools.stackScroll.activate(this.fullDcmEle.nativeElement, 1);
        cornerstoneTools.stackScrollTouchDrag.activate(this.fullDcmEle.nativeElement);
      }

      play() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        const stackState = cornerstoneTools.getToolState(this.fullDcmEle.nativeElement, 'stack');
        let frameRate;
        console.log('stackState ', stackState);
        if ( stackState && stackState.data[0] ) {
            frameRate = stackState.data[0].frameRate;
        }
        // Play at a default 10 FPS if the framerate is not specified
        if (frameRate === undefined) {
          frameRate = 10;
        }
        console.log('frameRate ' + frameRate);

        cornerstoneTools.playClip(this.fullDcmEle.nativeElement, frameRate);
      }

      stop() {
        this.disableAllTools(this.fullDcmEle.nativeElement);
        cornerstoneTools.stopClip(this.fullDcmEle.nativeElement);
      }

      disableAllTools(element) {
        cornerstoneTools.wwwc.disable(element);
        cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
        cornerstoneTools.probe.deactivate(element, 1);
        cornerstoneTools.length.deactivate(element, 1);
        cornerstoneTools.angle.deactivate(element, 1);
        cornerstoneTools.ellipticalRoi.deactivate(element, 1);
        cornerstoneTools.rectangleRoi.deactivate(element, 1);
        cornerstoneTools.stackScroll.deactivate(element, 1);
        cornerstoneTools.wwwcTouchDrag.deactivate(element);
        cornerstoneTools.zoomTouchDrag.deactivate(element);
        cornerstoneTools.panTouchDrag.deactivate(element);
        cornerstoneTools.stackScrollTouchDrag.deactivate(element);
    }

}
