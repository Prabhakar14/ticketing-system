import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatusColumnModel } from '../../interfaces/status-column-and-ticket.interface';
import { ZoomrxStoreService } from '../zoomrx-store/zoomrx-store.service';

@Injectable()
export class ZoomrxDashboardService {

  constructor(private storeService: ZoomrxStoreService) { }

  /**
   *
   * Add's new column to dashboard grid.
   *
   * @param name Column name.
   *
   */
  public addColumn(name: string): Observable<boolean> {

    const statusId: string = `${this.storeService.getNextStatusId()}`;

    const newColumn: StatusColumnModel = {
      id: `column-id-${statusId}`,
      name,
      statusId,
      tickets: []
    };

    const isAdded: boolean = this.storeService.addColumn(newColumn);

    return of(isAdded);

  }

  /**
   *
   * Delete'column.
   *
   * @param column Column.
   *
   */
  public deleteColumn(column: StatusColumnModel): Observable<boolean> {

    const isDeleted: boolean = this.storeService.deleteColumn(column);

    return of(isDeleted);

  }

  /**
   *
   * Get's dashboard data.
   *
   */
  public getDashboardData(): Observable<Array<StatusColumnModel>> {

    return of(this.storeService.getStatusColumnsData());

  }

}
