import { Injectable} from '@angular/core';
import { LocalsService } from './local-storage.service';
import { GlobalsService } from './globals.service';
import { AudioService } from "./audio.service";

@Injectable()
export class AchievesService {
    constructor(
        public localsService: LocalsService,
        public globalsService: GlobalsService,
        public audioService: AudioService,
    ) {
    }

    achievesCheckerSolvedVisitMainpages(params: any) {
        let adress = this.globalsService.achievesList.default.visit_page;
        adress[params].state = 'solve';
        adress[params].date_solved = Date.parse(Date());
        if (params !== 'visit_404') {
            ++adress.all_mainpages.progress_now;
        }
        if (adress.all_mainpages.progress_now === 5) {
            adress.all_mainpages.state = 'solve';
            adress.all_mainpages.date_solved = Date.parse(Date());
        }
        this.localsService.updateAchievesList(this.globalsService.achievesList);
        this.achieveMessage();
    }

    achieveMessage() {
        this.globalsService.newAchieve = true;
        this.audioService.audio.msg.play();
    }
}
