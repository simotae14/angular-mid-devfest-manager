import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TICKETS_URL } from './tokens';

// Shape of data from json-server
interface TicketEntry {
  id: string; // database ID
  eventId: string; // our actual event ID
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  // Inject the token we defined in Step 1
  private readonly ticketsUrl = inject(TICKETS_URL);

  // 1. State: Just a list of Event IDs
  private readonly ticketIds = signal<string[]>([]);

  // 2. Computed: Total count
  readonly count = computed(() => this.ticketIds().length);

  constructor() {
    this.loadTickets();
  }

  // 3. Initial Load
  private loadTickets(): void {
    this.http.get<TicketEntry[]>(this.ticketsUrl).subscribe({
      next: (data) => {
        // Extract just the event IDs for our local state
        const ids = data.map((t) => t.eventId);
        this.ticketIds.set(ids);
      },
      error: (err) => console.error('Failed to load cart', err),
    });
  }

  addTicket(eventId: string) {
    const previousIds = this.ticketIds();

    this.ticketIds.update((ids) => [...ids, eventId]);

    this.http.post(this.ticketsUrl + "wrong", { eventId }).subscribe({
        next : () => console.log('optimistic update was successful'),
        error: (err) => {
            console.error('Sync failed for event ID:', eventId);
            this.ticketIds.set(previousIds); // Revert to previous state on failure
            alert('Failed to add ticket to cart.'); // Notify user of failure
        },
    });
  }
}