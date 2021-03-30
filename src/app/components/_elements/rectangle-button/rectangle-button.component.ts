import {Component, Input, OnInit, HostBinding} from '@angular/core';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'rectangle_button',
  templateUrl: './rectangle-button.component.html',
  styleUrls: ['./rectangle-button.component.scss']
})
export class RectangleButtonComponent implements OnInit {
  @HostBinding('style.-corners-size') @Input() cornersSize: number;
  @Input() width: number;
  @Input() height: number;
  @Input() cornersPosition: string;
  @Input() borders: boolean;
  // @Input() element: string;
  @Input() state: string;
  @Input() action: string;
  @Input() text: string;
  @Input() icon: string;
  //SOUNDS
  @Input() muteClick: boolean = false;

  constructor(
      private audioService: AudioService
  ) { }

  ngOnInit(): void {
    if (this.muteClick === undefined) {
      this.muteClick = false;
    }
  }

  hoverSound() {
    if (!this.muteClick) {
      this.audioService.audio.selectSND.play();
    }
  }

  clickSound() {
    if (!this.muteClick) {
      this.audioService.audio.clickSND.play();
    }
  }

}
