import {Component, Input, OnInit} from '@angular/core';
import { Injectable} from '@angular/core';

const CURSORSYMBOL: string = '▊';

@Component({
  selector: 'typer-string',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.scss']
})

@Injectable()
export class TyperComponent implements OnInit {
  @Input() text: string;
  @Input() style: string;
  @Input() durationInner: number;
  @Input() charsAtOnce: number;

  public printData: string = "";
  public blancSymbol: string;

  constructor() { }

  ngOnInit(): void {
    if (this.durationInner === undefined) {
      this.durationInner = 0;
    }
    if (this.charsAtOnce === undefined) {
      this.charsAtOnce = 100;
    }
    this.stringSymbolGrowther(this.text, this.charsAtOnce, 0, this.durationInner)
  }

  stringSymbolGrowther(value:string, charsAtOnce: number, counter: number, delayMS: number) {
    // this.dataPrinted = true;

    if (value.length > counter) {
      if (this.blancSymbol === CURSORSYMBOL) {this.blancSymbol = ''} else {this.blancSymbol = CURSORSYMBOL}
      // this.blockChanges = true;
      setTimeout(() => {this.stringSymbolGrowther(value, charsAtOnce,counter + charsAtOnce , delayMS)}, delayMS);
      // ************************ CHANGE TEMPLATE VARIABLES ************************
      // ********************************** START **********************************
      this.printData = this.printData + value.slice(counter, counter + charsAtOnce);
      // *********************************** END ***********************************
    } else {
      // this.blockChanges = false;
      this.blancSymbol = ''
    }
  }

  // stringSymbolDecreaser(charsAtOnce: number, value: string, delayMS: number) {
  //   if (this.printData.text.length) {
  //     if (this.blancSymbol === CURSORSYMBOL) {this.blancSymbol = ''} else {this.blancSymbol = CURSORSYMBOL}
  //     this.blockChanges = true;
  //     // ************************ CHANGE TEMPLATE VARIABLES ************************
  //     // ********************************** START **********************************
  //     this.printData.text = value.slice(0, value.length - charsAtOnce);
  //     // *********************************** END ***********************************
  //     setTimeout(() => {this.stringSymbolDecreaser(charsAtOnce, this.printData.text, delayMS)}, delayMS);
  //   } else {
  //     this.dataPrinted = false;
  //
  //     this.blockChanges = false;
  //     this.blancSymbol = ''
  //   }
  // }

}
