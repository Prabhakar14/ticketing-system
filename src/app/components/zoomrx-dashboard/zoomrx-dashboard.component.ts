import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ZoomrxDashboardService } from 'src/app/services/zoomrx-dashboard/zoomrx-dashboard.service';
import { StatusColumnModel, TicketModel } from 'src/app/interfaces/status-column-and-ticket.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'zoomrx-dashboard',
  templateUrl: './zoomrx-dashboard.component.html',
  styleUrls: ['./zoomrx-dashboard.component.scss'],
  providers: [ZoomrxDashboardService]
})
export class ZoomrxDashboardComponent implements OnInit {

  public componentStatus: 'loaded' | 'loading' | 'error';
  public isShowAddField: boolean;
  public newColumnNameControl: FormControl;
  public statusColumnsData: Array<StatusColumnModel>;

  constructor(
    private dashboardService: ZoomrxDashboardService,
    private router: Router,
    private titleService: Title
  ) {

    this.titleService.setTitle('Dashboard');

    this.isShowAddField = false;

    this.newColumnNameControl = new FormControl(null, [Validators.required]);

    this.statusColumnsData = [];

  }

  /**
   *
   * Angular OnInit Lifecycle.
   *
   */
  ngOnInit(): void {

    this.getDashboardData();

  }

  /**
   *
   * Get's dashboard data.
   *
   */
  private getDashboardData(): void {

    this.componentStatus = 'loading';

    this.dashboardService.getDashboardData().subscribe((data: Array<StatusColumnModel>) => {

      this.statusColumnsData = data;

      this.componentStatus = 'loaded';

    }, () => {

      console.error('Unable to fetch dashboard data');

      this.componentStatus = 'error';

    })

  }

  /**
   *
   * Adds new column to dashboard grid.
   *
   */
  public addColumn(): void {

    if (this.newColumnNameControl.value && this.newColumnNameControl.value.trim()) {

      this.dashboardService.addColumn(this.newColumnNameControl.value).subscribe((state: boolean) => {

        this.isShowAddField = false;

        if (state) {

          this.getDashboardData();

        }

      });

    } else {

      this.isShowAddField = false;

    }

    this.newColumnNameControl.reset();

  }

  /**
   *
   * Cancels new column creation.
   *
   */
  public cencel(): void {

    this.newColumnNameControl.reset();

    this.isShowAddField = false;

  }

  /**
   *
   * Delete column from dashboard grid.
   *
   * @param column Column.
   *
   */
  public deleteColumn(column: StatusColumnModel): void {

    this.dashboardService.deleteColumn(column).subscribe((state: boolean) => {

      if (state) {

        this.getDashboardData();

      }

    });

  }

  /**
   *
   * On click card.
   * Navigates to edit ticket screen.
   *
   * @param event Ticket.
   *
   */
  public onCardClick(event: TicketModel): void {

    this.router.navigate([`/${event.statusId}/edit/${event.key}`]);

  }

  /**
   *
   * On drop card.
   *
   * @param event CdkDragDrop Event.
   *
   */
  public onDropCard(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      (<TicketModel[]>(<any[]>event.container.data))[event.currentIndex].statusId = event.container.id;

    }

  }

  /**
   *
   * On drop column.
   *
   * @param event CdkDragDrop Event.
   *
   */
  public onDropColumn(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

    }

  }

}
