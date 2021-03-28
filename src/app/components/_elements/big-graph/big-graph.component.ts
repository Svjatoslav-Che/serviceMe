import {AfterViewInit, ChangeDetectorRef, Component, Injectable, Input, OnInit} from '@angular/core';
import * as vivus from 'vivus';
import { GlobalsService } from "../../../services/globals.service";

@Component({
  selector: 'big-graph',
  templateUrl: './big-graph.component.html',
  styleUrls: ['./big-graph.component.scss']
})
@Injectable()
export class BigGraphComponent implements OnInit, AfterViewInit {
  @Input() public graphName: string;
  @Input() private drawSpeed: any;
  public blinkSymbol: boolean = false;
  @Input() public background: boolean;
  @Input() public coreActive: boolean;
  public innerService = {
    deviceType: '',
    os: '',
    browser: ''
  }

  constructor(
      public globalsService: GlobalsService,
      public changeDetector: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    setTimeout(()=> {
      if (this.graphName === 'Keanu') {
        if (!this.globalsService.firstDrawLoad) {
          const x = new vivus('pill', this.drawSpeed);
          this.globalsService.firstDrawLoad = true;
        }
      }

      // if (this.graphName === 'Hulk') {
      //   const x = new vivus('pill', {duration: 50});
      // }
    }, 0);
  }

  ngOnInit(): void {
    this.blinkRecursion();
    this.updateDeviceDescription();

    if (this.background === undefined) {
      this.background = true;
    }

    if (this.coreActive === undefined) {
      this.coreActive = false;
    }
  }

  redraw() {
    const x = new vivus('pill', this.drawSpeed);
  }

  updateDeviceDescription() {
    if (this.globalsService.deviceInfo.device.type === undefined) {
      this.innerService.deviceType = 'runs as desktop'
    } else {
      this.innerService.deviceType = this.globalsService.deviceInfo.device.type;
    }
    this.innerService.os = this.globalsService.deviceInfo.os.name;
    this.innerService.browser = this.globalsService.deviceInfo.browser.name;
  }

  blinkRecursion() {
    this.blinkSymbol = !this.blinkSymbol;
    setTimeout(()=> this.blinkRecursion(), 300);
  }
}
