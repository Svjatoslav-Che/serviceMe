import { Injectable } from '@angular/core';
import { LocalsService } from './local-storage.service';
import { CommonService } from './common.service';
import { GlobalsService } from './globals.service';
import { AudioService } from './audio.service';
import { AchievesService } from './achieves.service';

@Injectable()
export class ActionService {
    constructor(
        private localsService: LocalsService,
        private _data: CommonService,
        private globalsService: GlobalsService,
        public audioService: AudioService,
        public achievesService: AchievesService
    ) {}

    public actionGenerator(
        subject: string,
        location: string,
        action: string,
        description: string,
        params: any ): any {
        this._data.updateMessage({
            subject: subject,
            location: location,
            action: action,
            description: description,
            params: params,
            date: Date.parse(Date())
            }
        )


        if (description === 'visit mainpage solved') {
            this.achievesService.achievesCheckerSolvedVisitMainpages(params);
        }
    }


}
