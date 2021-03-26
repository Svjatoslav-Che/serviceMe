import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss']
})
export class ContentBoxComponent implements OnInit {
  @HostBinding('style.-corners-size') @Input() cornersSize: number;
  @Input() cornersPosition: string;
  @Input() borders: boolean;
  @Input() elementOrient: string;
  @Input() element: string;
  @Input() header: string;
  @Input() description: string;
  @Input() text: string;
  constructor(
      private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.audioService.audio.type.play();
  }

}
