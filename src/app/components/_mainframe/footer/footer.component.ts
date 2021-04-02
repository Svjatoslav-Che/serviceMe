import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations';
import { ActionService } from '../../../services/action.service';
import { LocalsService } from '../../../services/local-storage.service';
import { AudioService } from '../../../services/audio.service';

const DURATION = {duration: 300};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(DURATION),
    fadeOutDownOnLeaveAnimation(DURATION)
  ]
})
export class FooterComponent implements OnInit {
  @Input() height: number;
  @Input() actionScene: number;
  public soundMute: boolean = false;
  public ambientMute: boolean = false;

  constructor(
      public globalsService: GlobalsService,
      private actionService: ActionService,
      private localsService: LocalsService,
      private audioService: AudioService
  ) { }

  ngOnInit() {
    this.checkMuteSound()
  }

  checkMuteSound() {
    let soundMute = this.localsService.get('soundMute');
    let ambientMute = this.localsService.get('ambientMute');
    if (soundMute === 'true' ) {
      this.soundMute = true;
      this.globalsService.soundVol = 0;
      this.audioService.initSoundVol();
    }
    if (ambientMute === 'true' ) {
      this.ambientMute = true;
      this.globalsService.soundAmbient = 0;
      this.audioService.initSoundVol();
    }
  }

  linkInGo() {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'out link',
        'linked In link activated',
        'https://www.linkedin.com/in/svjatoslav-cherednikov-7176011a1/');

    window.open("https://www.linkedin.com/in/svjatoslav-cherednikov-7176011a1/", "_blank");
  }

  projectPageGo() {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'out link',
        'GitHub link activated',
        'https://github.com/Svjatoslav-Che/serviceMe');

    window.open("https://github.com/Svjatoslav-Che/serviceMe", "_blank");
  }

  popup(value) {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'popUp service',
        'Pop Up service called',
        value);

    this.globalsService.popupService = value;
  }

  muteSoundToggle() {
    !this.soundMute ? this.globalsService.soundVol = 0 : this.globalsService.soundVol = this.globalsService.checkSoundVol();
    this.audioService.initSoundVol();
    this.soundMute = !this.soundMute;
    this.localsService.set('soundMute', this.soundMute);
  }

  muteAmbientToggle() {
    !this.ambientMute ? this.globalsService.soundAmbient = 0 : this.globalsService.soundAmbient =  this.globalsService.soundVol;;
    this.audioService.initSoundVol();
    this.ambientMute = !this.ambientMute;
    this.localsService.set('ambientMute', this.ambientMute);
  }
}
