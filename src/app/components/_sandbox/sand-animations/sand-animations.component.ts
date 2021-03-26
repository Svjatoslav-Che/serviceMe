import { Component, OnInit } from '@angular/core';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };
const CURSORSYMBOL: string = '▊';

@Component({
  selector: 'app-sand-animations',
  templateUrl: './sand-animations.component.html',
  styleUrls: ['./sand-animations.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandAnimationsComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  public dataPrinted: boolean = false;
  public blockChanges: boolean = false;
  public blancSymbol: string;

  public charsAtOnce: number = 100;
  public durationInner: number = 0;

  public dataContent: any =  {
    header: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    text: '<h1>Lorem Ipsum</h1> has been the industrys standard dummy text ever <a>since the 1500s</a>, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br><br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing..',
    date: '20.20.2020 END'
  };

  public printData: any = {
    header: '',
    headerDone: false,
    description: '',
    descriptionDone: false,
    text: '',
    textDone: false,
    date: '',
    dateDone: false
  };

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  valueCharsAtOnceChanged(e: any) {
    this.charsAtOnce = Math.floor(e.target.value);
  }

  valueSpeedChanged(e: any) {
    this.durationInner = Math.floor(e.target.value);
  }

  resetSettings() {
    this.durationInner = 0;
    this.charsAtOnce = 100;
    this.printData.text = '';
    this.blockChanges = false;
    this.stringSymbolGrowther('', 1,0, 0);
    this.dataPrinted = false;
  }

  stringSymbolGrowther(value:string, charsAtOnce: number, counter: number, delayMS: number) {
    this.dataPrinted = true;

    if (value.length > counter) {
      if (this.blancSymbol === CURSORSYMBOL) {this.blancSymbol = ''} else {this.blancSymbol = CURSORSYMBOL}
      this.blockChanges = true;
      setTimeout(() => {this.stringSymbolGrowther(value, charsAtOnce,counter + charsAtOnce , delayMS)}, delayMS);
      // ************************ CHANGE TEMPLATE VARIABLES ************************
      // ********************************** START **********************************
      this.printData.text = this.printData.text + value.slice(counter, counter + charsAtOnce);
      // *********************************** END ***********************************
    } else {
      this.blockChanges = false;
      this.blancSymbol = ''
    }
  }

  stringSymbolDecreaser(charsAtOnce: number, value: string, delayMS: number) {
    if (this.printData.text.length) {
      if (this.blancSymbol === CURSORSYMBOL) {this.blancSymbol = ''} else {this.blancSymbol = CURSORSYMBOL}
      this.blockChanges = true;
      // ************************ CHANGE TEMPLATE VARIABLES ************************
      // ********************************** START **********************************
      this.printData.text = value.slice(0, value.length - charsAtOnce);
      // *********************************** END ***********************************
      setTimeout(() => {this.stringSymbolDecreaser(charsAtOnce, this.printData.text, delayMS)}, delayMS);
    } else {
      this.dataPrinted = false;

      this.blockChanges = false;
      this.blancSymbol = ''
    }
  }

  valueSoundChanged() {
    this.audioService.audio.applySND.play();
  }

  hoverSound() {
    this.audioService.audio.selectSND.play();
  }

// *************************** TEMPLATE CONDITIONS ***************************
  animInStart(event: AnimationEvent) {
  }

  animInDone(event: AnimationEvent) {
  }

  animOutStart(event: AnimationEvent) {
  }

  animOutDone(event: AnimationEvent) {
  }

  toggleDiv(currentData) {
    if (currentData.action === 'second route activated') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
