import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { LocalsService } from '../../../services/local-storage.service';
import { AudioService } from '../../../services/audio.service';
import { ActionService } from '../../../services/action.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  @ViewChild('sizeViewer') sizeViewer: ElementRef
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public elementOrient: string = 'left';
  public element: string;
  public header: string = 'DELETE';
  public description: string = 'confirm to delete ticket';

  constructor(
      public globalsService: GlobalsService,
      private localsService: LocalsService,
      public audioService: AudioService,
      private actionService: ActionService
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
        'delete form',
        'delete form open',
        'delete form open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'delete form',
        'delete form close',
        'delete form close',
        'close'
    );
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
      this.actionService.actionGenerator(
          'system',
          'delete form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    } else {
      this.elementOrient = 'left';
      this.actionService.actionGenerator(
          'system',
          'delete form',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    }
  }

  closeDelete() {
    this.globalsService.currentTicketNum = undefined;
    this.globalsService.currentTicket = undefined;
    this.globalsService.popupService = '';
    this.actionService.actionGenerator(
        'user',
        'delete form',
        'button click',
        'auto Pop Up close after close action',
        'close'
    );
  }

  destroyTicket() {
    this.localsService.removeOneStorageTicket(this.globalsService.currentTicketNum);
    this.actionService.actionGenerator(
        'user',
        'delete form',
        'button click',
        'ticket delete action',
        'delete'
    );
    this.globalsService.currentTicketNum = undefined;
    this.globalsService.currentTicket = undefined;
    this.globalsService.popupService = '';
  }
}


