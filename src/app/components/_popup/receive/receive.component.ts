import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { LocalsService } from '../../../services/local-storage.service';
import { AudioService } from '../../../services/audio.service';
import { CookieService } from '../../../services/cookie.service';
import { TokenService } from '../../../services/token.service';
import { ActionService } from "../../../services/action.service";

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})

export class ReceiveComponent implements OnInit, OnDestroy {
  @ViewChild('sizeViewer') sizeViewer: ElementRef;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public elementOrient: string = 'left';
  public element: string;
  public header: string = 'receive';
  public description: string = 'receive';

  constructor(
      public globalsService: GlobalsService,
      private localsService: LocalsService,
      public audioService: AudioService,
      private cookieService: CookieService,
      private tokenService: TokenService,
      private actionService: ActionService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getSize();
    }, 0);
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( event => {
      this.getSize();
    })
    this.audioService.audio.type.play();
    this.audioService.audio.receive.play();
    this.actionService.actionGenerator(
        'system',
        'receive form',
        'receive form open',
        'receive form open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'receive form',
        'receive form close',
        'receive form close',
        'close'
    );
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
      this.actionService.actionGenerator(
          'system',
          'receive form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    } else {
      this.elementOrient = 'left';
      this.actionService.actionGenerator(
          'system',
          'receive form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    }
  }

  closeWatch() {
    this.actionService.actionGenerator(
        'user',
        'receive form',
        'button click',
        'close ticket watch form',
        'receive'
    );
    this.globalsService.popupService = '';
  }
}




