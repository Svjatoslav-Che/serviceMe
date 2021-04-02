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
        headRoll: new Audio(),
        coreActivated: new Audio(),
        coreWorks: new Audio(),
        coreDeActivated: new Audio(),
        coreWorksHover: new Audio(),
        msg: new Audio(),
        receive: new Audio(),
    };

    loadSoundData() {
        // console.log('SD loaded');
        this.audio.routeIn.load();
        this.audio.routeOut.load();
        this.audio.smallIn.load();
        this.audio.smallOut.load();
        this.audio.applySND.load();
        this.audio.selectSND.load();
        this.audio.clickSND.load();
        this.audio.logIn.load();
        this.audio.logOut.load();
        this.audio.fail.load();
        this.audio.type.load();
        this.audio.complete.load();
        this.audio.headRoll.load();
        this.audio.coreActivated.load();
        this.audio.coreDeActivated.load();
        this.audio.msg.load();
        this.audio.receive.load();

        // this.checkState();
    }

    checkState() {
        console.log('network state');

        console.log(this.audio.routeIn.networkState);
        console.log(this.audio.routeOut.networkState);
        console.log(this.audio.smallIn.networkState);
        console.log(this.audio.smallOut.networkState);
        console.log(this.audio.applySND.networkState);
        console.log(this.audio.selectSND.networkState);
        console.log(this.audio.clickSND.networkState);
        console.log(this.audio.logIn.networkState);
        console.log(this.audio.logOut.networkState);
        console.log(this.audio.fail.networkState);
        console.log(this.audio.type.networkState);
        console.log(this.audio.complete.networkState);
        console.log(this.audio.headRoll.networkState);
    }

    initSoundData() {
        //HEADER ROLL IN
        this.audio.headRoll.src = ROUTE + "/assets/sounds/headroll.webm";
        //Router main shutter IN
        this.audio.routeIn.src = ROUTE + "/assets/sounds/routeout.webm";
        this.audio.routeOut.src = ROUTE + "/assets/sounds/routein.webm";
        //SMALL WINDOW FADE IN
        this.audio.smallIn.src = ROUTE + "/assets/sounds/on.webm";
        //SMALL WINDOW FADE OUT
        this.audio.smallOut.src = ROUTE + "/assets/sounds/off.webm";
        //APPLY SETTINGS SOUND
        this.audio.applySND.src = ROUTE + "/assets/sounds/apply.webm";
        //SELECT BTN SOUND
        this.audio.selectSND.src = ROUTE + "/assets/sounds/select.webm";
        //CLICK BTN SND
        this.audio.clickSND.src = ROUTE + "/assets/sounds/click.webm";
        //LOGIN
        this.audio.logIn.src = ROUTE + "/assets/sounds/login.webm";
        //LOGOUT
        this.audio.logOut.src = ROUTE + "/assets/sounds/logout.webm";
        //FAIL
        this.audio.fail.src = ROUTE + "/assets/sounds/fail.webm";
        //TYPE
        this.audio.type.src = ROUTE + "/assets/sounds/type.webm";
        //COMPLETE
        this.audio.complete.src = ROUTE + "/assets/sounds/complete.webm";
        //CORE
        this.audio.coreActivated.src = ROUTE + "/assets/sounds/power_on.webm";
        this.audio.coreDeActivated.src = ROUTE + "/assets/sounds/power_off.webm";
        //MESSAGE
        this.audio.msg.src = ROUTE + "/assets/sounds/msg.webm";
        //RECEIVE
        this.audio.receive.src = ROUTE + "/assets/sounds/receive.webm";
        this.initSoundVol();
    }

    initSoundVol() {
        let innerVol = this.globalsService.soundVol/100;
        let innerAmbient = this.globalsService.soundAmbient/100;
        //HEADER ROLL IN
        this.audio.headRoll.volume = innerVol;
        //Router main shutter IN
        this.audio.routeIn.volume = innerVol;
        this.audio.routeOut.volume = innerVol;
        //SMALL WINDOW FADE IN
        this.audio.smallIn.volume = innerVol;
        //SMALL WINDOW FADE OUT
        this.audio.smallOut.volume = innerVol;
        //APPLY SETTINGS SOUND
        this.audio.applySND.volume = innerVol;
        //SELECT BTN SOUND
        this.audio.selectSND.volume = innerVol;
        //CLICK BTN SND
        this.audio.clickSND.volume = innerVol;
        //LOGIN
        this.audio.logIn.volume = innerVol;
        //LOGOUT
        this.audio.logOut.volume = innerVol;
        //FAIL
        this.audio.fail.volume = innerVol;
        //TYPE
        this.audio.type.volume = innerVol;
        //COMPLETE
        this.audio.complete.volume = innerVol;
        //CORE
        this.audio.coreActivated.volume = innerAmbient;
        this.audio.coreDeActivated.volume =  innerAmbient;
        //MESSAGE
        this.audio.msg.volume = innerAmbient;
        //RECEIVE
        this.audio.receive.volume = innerAmbient;
    }
}
