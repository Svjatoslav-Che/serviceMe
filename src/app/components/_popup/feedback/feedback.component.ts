import { Component, OnInit, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { GlobalsService } from "../../../services/globals.service";
import { Observable, Subscription, fromEvent } from "rxjs";
import { FormControl, FormGroup } from '@angular/forms';
import { LocalsService } from "../../../services/local-storage.service";
import LocalKey from '../../../services/local-storage-key.constant';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('sizeViewer') sizeViewer: ElementRef;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public elementOrient: string = 'left';
  public element: string;
  public header: string = 'FEEDBACK';
  public description: string = 'describe issue';
  public thisForm: boolean = false;
  public urlPicturesList = [];
  form = new FormGroup({
    date: new FormControl(Date()),
    issue_state: new FormControl(''),
    description: new FormControl(''),
    screenshots: new FormControl([]),
  });

  constructor(
      public globalsService: GlobalsService,
      private localsService: LocalsService,
      public audioService: AudioService
  ) { }

  ngOnInit(): void {
    let localSave = JSON.parse(this.localsService.localStorageGetTicketEntry());
    if (localSave) {
      this.form.setValue(localSave);
      this.urlPicturesList = this.form.value.screenshots;
    };
    setTimeout(() => {
      this.thisForm = true;
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

  fromCloseOutclick() {
    if (this.thisForm) {
      this.globalsService.popupService = '';
    }
  }

  checkingFiles(filesList) {
    if (filesList.length > 5) {
      return [...filesList].splice(0, 5);
    }
    return filesList;
  }

  removeImage(index) {
    console.log(index)
    this.urlPicturesList.splice(index, 1);
  }

  handleFiles(event) {
    let files = this.checkingFiles(event.target.files);

    if (this.form.value.screenshots.length < 5) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 10000000) {
          // in case of multiply & file size - Over Size
          // INPUT ERROR MESSAGE CONDITION HERE
          break;
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = (event: any) => {
            this.urlPicturesList.push(event.target.result);
          }
        };
      }
    } else {
      // in case of multiply & files num - much 5
      // INPUT ERROR MESSAGE CONDITION HERE
    }
  }

  send() {
    this.form.value.screenshots = this.urlPicturesList;
    this.localsService.localStorageAddTicket(this.form.value);
    this.localsService.remove(LocalKey.FEEDBACK_TEMP);
    this.fromCloseOutclick();
  }

  cancel() {
    this.localsService.remove(LocalKey.FEEDBACK_TEMP);
    this.fromCloseOutclick();
  }

  save() {
    this.form.value.screenshots = this.urlPicturesList;
    this.localsService.localStorageSaveTicketEntry(this.form.value);
    this.fromCloseOutclick();
  }


}

