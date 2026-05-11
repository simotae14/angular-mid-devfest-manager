import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { DevFestEvent } from "../models/event.model";

@Injectable({
  providedIn: "root", // This is a singleton in our application
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events'; // URL to web api
  private readonly http = inject(HttpClient);

  getEventsResource(query: Signal<string>) {
    return httpResource<DevFestEvent[]>(() => {
      const q = query(); // ← DEVE essere dentro la callback
      return q ? `${this.apiUrl}?q=${q}` : this.apiUrl;
    });
  }

  getEventResource(id: Signal<string>) {
    return httpResource<DevFestEvent>(() => {
      const eventId = id();
      // If no ID (or routing transition), don't fetch yet
      if (!eventId) return undefined;

      return `${this.apiUrl}/${eventId}`;
    });
  }

  deleteEvent(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  };

  createEvent(event: Omit<DevFestEvent, 'id'>) {
    return this.http.post<DevFestEvent>(this.apiUrl, event)
  }
}