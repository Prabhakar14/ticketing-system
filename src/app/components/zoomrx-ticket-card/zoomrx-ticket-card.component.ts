import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketModel } from '../../interfaces/status-column-and-ticket.interface';

@Component({
  selector: 'zoomrx-ticket-card',
  templateUrl: './zoomrx-ticket-card.component.html',
  styleUrls: ['./zoomrx-ticket-card.component.scss']
})
export class ZoomrxTicketCardComponent {

  @Input() ticketDetails: TicketModel;
  @Output() cardClick: EventEmitter<TicketModel> = new EventEmitter();

  constructor() {

    this.ticketDetails = <TicketModel>{};

  }

  /**
   *
   * On click card.
   *
   */
  onCardClick(): void {

    this.cardClick.next(this.ticketDetails);

  }

}
