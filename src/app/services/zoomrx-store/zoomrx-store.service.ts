import { Injectable } from '@angular/core';
import { CommentModel, StatusColumnModel, TicketModel } from '../../interfaces/status-column-and-ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class ZoomrxStoreService {

  private nextStatusId: number;
  private nextTicketId: number;
  private statusColumnsData: Array<StatusColumnModel>;

  constructor() {

    this.nextStatusId = 6000;

    this.nextTicketId = 10;

    this.statusColumnsData = [
      {
        id: 'group-1',
        name: 'To Do',
        statusId: '1000',
        tickets: [
          {
            id: 4,
            key: 'DEV-4',
            title: ' Create a reusable card component',
            description: 'Create / Update / Delete one or more cards within a list.',
            statusId: '1000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
          {
            id: 5,
            key: 'DEV-5',
            title: 'Rearrange the groups',
            description: 'Rearrange the list with in the board(Drag & Drop)',
            statusId: '1000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
          {
            id: 6,
            key: 'DEV-6',
            title: 'Rearrange the cards',
            description: 'Rearrange the cards with in the list(Drag & Drop)',
            statusId: '1000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
          {
            id: 7,
            key: 'DEV-7',
            title: 'API Integration',
            description: 'Api integration for dashboard',
            statusId: '1000'
          }
        ]
      },
      {
        id: 'group-2',
        name: 'Dev In Progress',
        statusId: '2000',
        tickets: [
          {
            id: 1,
            key: 'DEV-1',
            title: 'Workspace Setup',
            description: 'Create zoomrx workspace with Angular 10',
            statusId: '2000'
          },
          {
            id: 2,
            key: 'DEV-2',
            title: 'Create and name a board.',
            description: 'Create dashboard component and name a board.',
            statusId: '2000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
          {
            id: 3,
            key: 'DEV-3',
            title: 'Create / Update / Delete one or more lists within a board',
            description: 'Create / Update / Delete one or more lists within a board.',
            statusId: '2000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          }
        ]
      },
      {
        id: 'group-3',
        name: 'Review',
        statusId: '3000',
        tickets: [
          {
            id: 8,
            key: 'DEV-1',
            title: 'Project Tech-Stack',
            description: 'Identify required tech-stack for the ZoomRx application.',
            statusId: '3000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
        ]
      },
      {
        id: 'group-4',
        name: 'Testing Ready',
        statusId: '4000',
        tickets: []
      },
      {
        id: 'group-5',
        name: 'Completed',
        statusId: '5000',
        tickets: [
          {
            id: 9,
            key: 'DEV-9',
            title: 'Requirements Analysis',
            description: 'Check project requirements.',
            statusId: '5000',
            comments: [
              {
                commentText: 'Comment text 2',
                date: '2020-10-04T08:50:09.779Z'
              },
              {
                commentText: 'Comment text 1',
                date: '2020-10-03T08:50:09.779Z'
              }
            ]
          },
        ]
      }
    ];

  }

  /**
   *
   * Get item index.
   *
   * @param list List.
   * @param id Id.
   * @param key Key.
   *
   */
  private getIndex(list: any[], id: string | number, key: string = 'id'): number {

    return list.findIndex((item: any) => item[key] === id);

  }

  /**
   *
   * Add column.
   *
   * @param columnDetails Column details.
   *
   */
  public addColumn(columnDetails: StatusColumnModel): boolean {

    this.statusColumnsData.push(columnDetails);

    this.nextStatusId++;

    return true;

  }

  /**
   *
   * Create or update ticket.
   *
   * @param ticket Ticket details.
   * @param isEdit Is edit.
   * @param newComment New comment to the ticket.
   *
   */
  public createUpdateTicket(ticket: TicketModel, isEdit?: boolean, newComment?: CommentModel): boolean {

    const columnIndex: number = this.getIndex(this.statusColumnsData, ticket.statusId, 'statusId');

    let isValid: boolean = columnIndex !== -1;

    if (isValid) {

      const statusColumnsData: StatusColumnModel[] = [...this.statusColumnsData];

      const columnData: StatusColumnModel = { ...statusColumnsData[columnIndex] };

      const tickets: Array<TicketModel> = columnData.tickets ? [...columnData.tickets] : [];

      if (isEdit) {

        isValid = this.updateTicket(tickets, ticket, newComment);

      } else {

        tickets.push(ticket);

        this.nextTicketId++;

      }

      if (isValid) {

        columnData.tickets = tickets;

        statusColumnsData[columnIndex] = columnData;

        this.statusColumnsData = statusColumnsData;

      }

    }

    return isValid;

  }

  /**
   *
   * Delete column.
   *
   * @param column Column.
   *
   */
  public deleteColumn(column: StatusColumnModel): boolean {

    const columnIndex: number = this.getIndex(this.statusColumnsData, column.id);

    const isValid: boolean = columnIndex !== -1;

    if (isValid) {

      const statusColumnsData: any[] = [...this.statusColumnsData];

      statusColumnsData.splice(columnIndex, 1);

      this.statusColumnsData = statusColumnsData;

    }

    return isValid;

  }

  /**
   *
   * Delete ticket.
   *
   * @param ticket Ticket.
   *
   */
  public deleteTicket(ticket: TicketModel): boolean {

    const columnIndex: number = this.getIndex(this.statusColumnsData, ticket.statusId, 'statusId');

    let isValid: boolean = columnIndex !== -1;

    if (isValid) {

      const statusColumnsData: StatusColumnModel[] = [...this.statusColumnsData];

      const columnData: StatusColumnModel = { ...statusColumnsData[columnIndex] };

      const tickets: Array<TicketModel> = columnData.tickets ? [...columnData.tickets] : [];

      isValid = !!tickets.length;

      if (isValid) {

        const ticketIndex: number = this.getIndex(tickets, ticket.id);

        tickets.splice(ticketIndex, 1);

        columnData.tickets = tickets;

        statusColumnsData[columnIndex] = columnData;

        this.statusColumnsData = statusColumnsData;

      }

    }

    return isValid;

  }

  /**
   *
   * Get's next status id.
   *
   */
  public getNextStatusId(): number {

    return this.nextStatusId;

  }

  /**
   *
   * Get's next ticket is.
   *
   */
  public getNextTicketId(): number {

    return this.nextTicketId;

  }

  /**
   *
   * Get's columns data.
   *
   */
  public getStatusColumnsData(): Array<StatusColumnModel> {

    return this.statusColumnsData;

  }

  /**
   *
   * Update's ticket.
   *
   * @param tickets Tickets.
   * @param ticket Ticket.
   * @param newComment New comment to the ticket.
   *
   */
  public updateTicket(tickets: TicketModel[], ticket: TicketModel, newComment?: CommentModel): boolean {

    const ticketIndex: number = this.getIndex(tickets, ticket.id);

    const isValid: boolean = ticketIndex !== -1;

    if (isValid) {

      const existingTicket: TicketModel = { ...tickets[ticketIndex] };

      existingTicket.title = ticket.title;

      existingTicket.description = ticket.description;

      existingTicket.comments = ticket.comments || [];

      if (newComment) {

        existingTicket.comments.unshift(newComment);

      }

      tickets[ticketIndex] = existingTicket;

    }

    return isValid;

  }

}
