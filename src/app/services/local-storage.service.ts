import { Injectable } from '@angular/core';
import LocalKey from "./local-storage-key.constant";
import {parseJson} from "@angular/cli/utilities/json-file";

@Injectable()
export class LocalsService {
    constructor() {
    }

    public set(key: string, value: any) {
        return localStorage.setItem(key, value);
    }

    public get(key: string) {
        return localStorage.getItem(key);
    }

    public remove(key: string) {
        return localStorage.removeItem(key);
    }

    public destroyAll() {
        return localStorage.clear();
    }

    public list() {
       return Object.keys(localStorage);
    }

    public localStorageSaveTicketEntry(ticket: any) {
        this.set(LocalKey.FEEDBACK_TEMP, JSON.stringify(ticket));
    }

    public localStorageGetTicketEntry() {
        return this.get(LocalKey.FEEDBACK_TEMP);
    }

    public localStorageAddTicket(ticket: any) {
        let ticketList = JSON.parse(this.get(LocalKey.TICKET_STORAGE));

        if (ticketList) {
            ticketList.unshift(ticket);
            this.set(LocalKey.TICKET_STORAGE, JSON.stringify(ticketList));
        } else {
            let ticketList = [];
            ticketList.unshift(ticket)
            this.set(LocalKey.TICKET_STORAGE, JSON.stringify(ticketList));
        }
    }

    public getCurrentTicket(value) {
        let tickets = this.getAllStorageTickets();
        return tickets[value];
    }

    public getAllStorageTickets() {
        return JSON.parse(this.get(LocalKey.TICKET_STORAGE));
    }

    public removeOneStorageTicket(value) {
        let ticketList = JSON.parse(this.get(LocalKey.TICKET_STORAGE));
        ticketList.splice(value, 1);
        this.set(LocalKey.TICKET_STORAGE, JSON.stringify(ticketList));
    }

}
