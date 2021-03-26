import {Component, Input, OnInit, HostBinding} from '@angular/core';
import { AudioService } from "../../../services/audio.service";

@Component({
  selector: 'square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.scss']
})
export class SquareButtonComponent implements OnInit {
  @HostBinding('style.-corners-size') @Input() cornersSize: number;
  @Input() cornersPosition: string;
  @Input() borders: boolean;
  // @Input() element: string;
  @Input() state: string;
  @Input() action: string;
  @Input() text: string;
  @Input() icon: string;
  @Input() background: boolean;
  //SOUNDS
  @Input() muteClick: boolean;

  constructor(
      private audioService: AudioService,
  ) { }

  ngOnInit(): void {
    if (this.background === undefined) {
      this.background = true;
    }
    if (this.muteClick === undefined) {
      this.muteClick = false;
    }
  }

  hoverSound() {
    if (this.action === 'active') {
      this.audioService.audio.selectSND.play();
    }
  }

  clickSound() {
    if (this.action === 'active' && !this.muteClick) {
      this.audioService.audio.clickSND.play();
    }
  }

}
