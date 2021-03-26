import {Component, Input, OnInit, HostBinding} from '@angular/core';
import { AudioService } from "../../../services/audio.service";

@Component({
  selector: 'square-header',
  templateUrl: './square-header.component.html',
  styleUrls: ['./square-header.component.scss']
})
export class SquareHeaderComponent implements OnInit {
  @HostBinding('style.-corners-size') @Input() cornersSize: number;
  @Input() cornersPosition: string;
  @Input() borders: boolean;
  // @Input() element: string;
  @Input() state: string;
  @Input() action: string;
  @Input() text: string;
  @Input() description: string;
  @Input() background: boolean;
  //SOUNDS
  @Input() muteClick: boolean;

  constructor(
      private audioService: AudioService
  ) { }

  ngOnInit(): void {
    if (this.background === undefined) {
      this.background = true;
    }
    if (this.text === 'JP') {
      this.background = false;
    }
    // console.log(this.text)
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

