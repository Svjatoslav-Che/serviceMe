import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { LocalsService } from '../../../services/local-storage.service';
import { AudioService } from '../../../services/audio.service';
import { CookieService } from '../../../services/cookie.service';
import { TokenService } from '../../../services/token.service';
import { ActionService } from "../../../services/action.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent implements OnInit, OnDestroy {
  @ViewChild('sizeViewer') sizeViewer: ElementRef;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public elementOrient: string = 'left';
  public element: string;
  public header: string = 'TICKET';
  public description: string = 'content';

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
    this.actionService.actionGenerator(
        'system',
        'ticket watch form',
        'ticket watch form open',
        'ticket watch form open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'ticket watch form',
        'ticket watch form close',
        'ticket watch form close',
        'close'
    );
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
      this.actionService.actionGenerator(
          'system',
          'ticket watch form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    } else {
      this.elementOrient = 'left';
      this.actionService.actionGenerator(
          'system',
          'ticket watch form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    }
  }

  closeWatch() {
    this.actionService.actionGenerator(
        'user',
        'ticket watch form',
        'button click',
        'close ticket watch form',
        'close'
    );
    this.globalsService.currentTicketNum = undefined;
    this.globalsService.currentTicket = undefined;
    this.globalsService.popupService = '';
  }

  deleteWatch() {
    this.actionService.actionGenerator(
        'user',
        'ticket watch form',
        'button click',
        'delete ticket form call',
        'delete'
    );
    this.globalsService.popupService = 'delete-ticket';
  }
}


