import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommentModel, TicketModel } from 'src/app/interfaces/status-column-and-ticket.interface';
import { ZoomrxTicketService } from 'src/app/services/zoomrx-ticket/zoomrx-ticket.service';

interface TicketFromValueModel {
  title: string;
  description: string;
}

@Component({
  selector: 'zoomrx-create-edit-card',
  templateUrl: './zoomrx-create-edit-card.component.html',
  styleUrls: ['./zoomrx-create-edit-card.component.scss'],
  providers: [ZoomrxTicketService],
})
export class ZoomrxCreateEditCardComponent implements OnInit {

  private defaultFormValue: TicketFromValueModel;
  private statusId: string;
  private ticketKey: string;

  public commentControl: FormControl;
  public componetStatus: 'loading' | 'loaded' | 'error';
  public isEdit: boolean;
  public isFormValueChanged: boolean;
  public ticket: TicketModel;
  public ticketFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ticketService: ZoomrxTicketService,
    private titleService: Title,
    public locationService: Location
  ) {

    this.titleService.setTitle('Create / Update Ticket');

    this.componetStatus = 'loaded';

    this.isFormValueChanged = true;

    this.isEdit = false;

    this.commentControl = this.formBuilder.control('', Validators.required);

    this.ticket = {
      id: 0,
      key: 'DEV-0',
      statusId: '',
      title: '',
      description: '',
      comments: []
    };

    this.ticketFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.defaultFormValue = this.ticketFormGroup.getRawValue();

  }

  /**
   *
   * Angular OnInit lifecycle.
   *
   */
  ngOnInit(): void {

    this.onChangeRouteParam();

  }

  /**
   *
   * On form value changes.
   *
   */
  private fromValueChanges(): void {

    this.ticketFormGroup.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
    ).subscribe((value: TicketFromValueModel) => {

      this.isFormValueChanged = JSON.stringify(value) !== JSON.stringify(this.defaultFormValue);

    });

  }

  /**
   *
   * Get's ticket details.
   *
   */
  private getTicketDetails(): void {

    if (this.isEdit) {

      this.componetStatus = 'loading';

      this.isFormValueChanged = false;

      this.fromValueChanges();

      this.ticketService.getTicket(this.statusId, this.ticketKey).subscribe((ticket: TicketModel | boolean) => {

        if (ticket) {

          this.ticket = <TicketModel>ticket;

          this.updateForm();

          this.componetStatus = 'loaded';

        } else {

          this.componetStatus = 'error';

        }

      });

    }

  }

  /**
   *
   * On change route params.
   *
   */
  private onChangeRouteParam(): void {

    this.activatedRoute.paramMap.subscribe((parameters: ParamMap) => {

      this.statusId = <string>parameters.get('statusId');

      this.isEdit = !!(this.ticketKey = <string>parameters.get('key'));

      this.getTicketDetails();

    });

  }

  /**
   *
   * Updates form value with existing ticket details.
   *
   */
  private updateForm(): void {

    this.ticketFormGroup.patchValue({
      title: this.ticket.title,
      description: this.ticket.description
    });

    this.defaultFormValue = this.ticketFormGroup.getRawValue();

  }

  /**
   *
   * Add's comment to the ticket.
   *
   */
  public addComment(): void {

    const comment: CommentModel = {
      commentText: this.commentControl.value,
      date: (new Date()).toJSON()
    };

    this.ticketService.addComment(this.ticket, comment).subscribe((isSuccess: boolean) => {

      if (isSuccess) {

        this.ticket.comments = this.ticket.comments || [];

        this.ticket.comments = [comment, ...this.ticket.comments];

        this.commentControl.reset();

      }

    });

  }

  /**
   *
   * Creates new ticket.
   *
   */
  public createTicket(): void {

    const editedTicket: TicketModel = {
      ...this.ticket,
      ...this.ticketFormGroup.getRawValue(),
      statusId: this.statusId
    };

    this.ticketService.createTicket(editedTicket).subscribe((isSuccess: boolean) => {

      if (isSuccess) {

        this.router.navigate(['/dashboard']);

      }

    });

  }

  /**
   *
   * Delete ticket.
   *
   */
  public deleteTicket(): void {

    this.ticketService.deleteTicket(this.ticket).subscribe((isSuccess: boolean) => {

      if (isSuccess) {

        this.router.navigate(['/dashboard']);

      }

    });

  }

  /**
   *
   * Resets form.
   *
   */
  public resetForm(): void {

    this.ticketFormGroup.reset();

    this.commentControl.reset();

    if (this.isEdit) {

      this.ticketFormGroup.patchValue({
        title: this.ticket.title,
        description: this.ticket.description
      });

    }

  }

  /**
   *
   * Update existing ticket.
   *
   */
  public updateTicket(): void {

    const editedTicket: TicketModel = {
      ...this.ticket,
      ...this.ticketFormGroup.getRawValue()
    };

    this.ticketService.updateTicket(this.ticket, editedTicket).subscribe((isSuccess: boolean) => {

      if (isSuccess) {

        this.getTicketDetails();

      }

    });

  }

}
