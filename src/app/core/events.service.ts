import { httpResource } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { DevFestEvent } from "../models/event.model";

@Injectable({
  providedIn: "root", // This is a singleton in our application
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events'; // URL to web api

  getEventsResource(query: Signal<string>) {
    return httpResource<DevFestEvent[]>(() => {
      const q = query(); // ← DEVE essere dentro la callback
      return q ? `${this.apiUrl}?query=${q}` : this.apiUrl;
    });
  }
}