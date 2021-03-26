import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit, OnChanges {
  @Input() public class: string;
  @Input() public object: any;
  @Input() public selected: string;
  @Input() public backValue: any;

  @Output() callBack: EventEmitter<any> = new EventEmitter();

  public openDrops: boolean = false;
  public selectedDisplay: string;

  constructor(
      private audioService: AudioService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    this.checkSelected()
  }

  dropToggle() {
    this.openDrops ? this.audioService.audio.smallOut.play() : this.audioService.audio.smallIn.play()
    this.openDrops = !this.openDrops;
  }

  closeDrop() {
    this.audioService.audio.smallOut.play();
    this.openDrops = false;
  }

  checkSelected() {
    if (this.class === 'casualMenu' || this.class === 'tableMenu') {
      this.object.forEach(element => {
            if (element.value === this.selected) {
              this.selectedDisplay = element.name
            }
          }
      )
    } else {
      this.object.forEach(element => {
            if (element.route === this.selected) {
              this.selectedDisplay = element.name
            }
          }
      )
    }
  }

  outPut(value) {
    this.audioService.audio.applySND.play();
    this.callBack.emit(value);
  }

  hoverSound() {
      this.audioService.audio.selectSND.play();
  }

}
