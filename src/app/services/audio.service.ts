import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { environment } from "../../environments/environment";

const ROUTE = environment.host_url;

@Injectable()
export class AudioService {

    constructor(
        private globalsService: GlobalsService,
    ) {
    }

    public audio = {
        routeIn: new Audio(),
        routeOut: new Audio(),

        logIn: new Audio(),
        logOut: new Audio(),

        applySND: new Audio(),
        selectSND: new Audio(),
        clickSND: new Audio(),

        smallIn: new Audio(),
        smallOut: new Audio(),

        fail: new Audio(),
        type: new Audio(),
        complete: new Audio(),
    };

    initSoundData() {
        //Router main shutter IN
        this.audio.routeIn.src = ROUTE + "/assets/sounds/routeout.webm";
        this.audio.routeIn.load();
        this.audio.routeIn.volume = this.globalsService.soundVol/100;
        //Router main shutter OUT
        this.audio.routeOut.src = ROUTE + "/assets/sounds/routein.webm";
        this.audio.routeOut.load();
        this.audio.routeOut.volume = this.globalsService.soundVol/100;

        //SMALL WINDOW FADE IN
        this.audio.smallIn.src = ROUTE + "/assets/sounds/on.webm";
        this.audio.smallIn.load();
        this.audio.smallIn.volume = this.globalsService.soundVol/100;
        //SMALL WINDOW FADE OUT
        this.audio.smallOut.src = ROUTE + "/assets/sounds/off.webm";
        this.audio.smallOut.load();
        this.audio.smallOut.volume = this.globalsService.soundVol/100;

        //APPLY SETTINGS SOUND
        this.audio.applySND.src = ROUTE + "/assets/sounds/apply.webm";
        this.audio.applySND.load();
        this.audio.applySND.volume = this.globalsService.soundVol/100;
        //SELECT BTN SOUND
        this.audio.selectSND.src = ROUTE + "/assets/sounds/select.webm";
        this.audio.selectSND.load();
        this.audio.selectSND.volume = this.globalsService.soundVol/100;
        //CLICK BTN SND
        this.audio.clickSND.src = ROUTE + "/assets/sounds/click.webm";
        this.audio.clickSND.load();
        this.audio.clickSND.volume = this.globalsService.soundVol/100;

        //LOGIN
        this.audio.logIn.src = ROUTE + "/assets/sounds/login.webm";
        this.audio.logIn.load();
        this.audio.logIn.volume = this.globalsService.soundVol/100;
        //LOGOUT
        this.audio.logOut.src = ROUTE + "/assets/sounds/logout.webm";
        this.audio.logOut.load();
        this.audio.logOut.volume = this.globalsService.soundVol/100;

        //FAIL
        this.audio.fail.src = ROUTE + "/assets/sounds/fail.webm";
        this.audio.fail.load();
        this.audio.fail.volume = this.globalsService.soundVol/100;
        //TYPE
        this.audio.type.src = ROUTE + "/assets/sounds/type.webm";
        this.audio.type.load();
        this.audio.type.volume = this.globalsService.soundVol/100;
        //COMPLETE
        this.audio.complete.src = ROUTE + "/assets/sounds/complete.webm";
        this.audio.complete.load();
        this.audio.complete.volume = this.globalsService.soundVol/100;
    }
}
