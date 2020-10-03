import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentModel, StatusColumnModel, TicketModel } from 'src/app/interfaces/status-column-and-ticket.interface';
import { ZoomrxStoreService } from '../zoomrx-store/zoomrx-store.service';

@Injectable()
export class ZoomrxTicketService {

  constructor(private storeService: ZoomrxStoreService) { }

  /**
   *
   * Add's new comment to the ticket.
   *
   * @param ticket Ticket.
   * @param newComment New comment.
   *
   */
  public addComment(ticket: TicketModel, newComment: CommentModel): Observable<boolean> {

    let isSuccess: boolean;

    ticket = { ...ticket };

    ticket.comments = [...ticket.comments];

    isSuccess = this.storeService.createUpdateTicket(ticket, true, newComment);

    return of(isSuccess);

  }

  /**
   *
   * Create's ticket.
   *
   * @param ticketDetails Ticket details.
   *
   */
  public createTicket(ticketDetails: TicketModel): Observable<boolean> {

    const ticketId: number = this.storeService.getNextTicketId();

    const newTicket: TicketModel = {
      id: ticketId,
      key: `DEV-${ticketId}`,
      statusId: ticketDetails.statusId,
      title: ticketDetails.title,
      description: ticketDetails.description,
      comments: ticketDetails.comments
    };


    const isSuccess: boolean = this.storeService.createUpdateTicket(newTicket);

    return of(isSuccess);

  }

  /**
   *
   * Delete's ticket.
   *
   * @param ticket Ticket.
   *
   */
  public deleteTicket(ticket: TicketModel): Observable<boolean> {

    const isSuccess: boolean = this.storeService.deleteTicket(ticket);

    return of(isSuccess);

  }

  /**
   *
   * Get ticket.
   *
   * @param statusId Status id.
   * @param ticketKey Ticket key.
   *
   */
  public getTicket(statusId: string, ticketKey: string): Observable<TicketModel | boolean> {

    const columns: StatusColumnModel[] = this.storeService.getStatusColumnsData();

    const ticket: TicketModel = (columns.find((column: StatusColumnModel) => {
      return column.statusId === statusId;
    }) || { tickets: [] }).tickets.find((ticket: TicketModel) => ticket.key === ticketKey);

    if (ticket) {

      ticket.comments = ticket.comments ? [...ticket.comments] : [];

    }

    return of(ticket || !!ticket);

  }

  /**
   *
   * Update's ticket.
   *
   * @param ticket Ticket.
   * @param updatedTicket Updated value of ticket.
   *
   */
  public updateTicket(ticket: TicketModel, updatedTicket: TicketModel): Observable<boolean> {

    let isSuccess: boolean;

    ticket.title = updatedTicket.title;

    ticket.description = updatedTicket.description;

    isSuccess = this.storeService.createUpdateTicket(ticket, true);

    return of(isSuccess);

  }

}
