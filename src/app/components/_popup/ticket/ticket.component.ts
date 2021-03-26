import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { GlobalsService } from "../../../services/globals.service";
import { Observable, Subscription, fromEvent } from "rxjs";
import { LocalsService } from "../../../services/local-storage.service";
import { AudioService } from '../../../services/audio.service';
import { CookieService } from '../../../services/cookie.service';
import { TokenService } from '../../../services/token.service';
import { ActionsComponent} from "../../actions/actions.component";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
// @Injectable()
export class TicketComponent implements OnInit {
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
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
    } else {
      this.elementOrient = 'left';
    }
  }

  closeWatch() {
    this.globalsService.currentTicketNum = undefined;
    this.globalsService.currentTicket = undefined;
    this.globalsService.popupService = '';
  }

  deleteWatch() {
    this.globalsService.popupService = 'delete-ticket';
  }
}


