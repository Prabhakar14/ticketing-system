import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ZoomrxDashboardService } from 'src/app/services/zoomrx-dashboard/zoomrx-dashboard.service';

import { ZoomrxDashboardComponent } from './zoomrx-dashboard.component';

describe('ZoomrxDashboardComponent', () => {
  let component: ZoomrxDashboardComponent;
  let fixture: ComponentFixture<ZoomrxDashboardComponent>;
  let dashboardService: ZoomrxDashboardService;
  let router: Router;
  let titleService: Title;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomrxDashboardComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        Title,
        ZoomrxDashboardService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomrxDashboardComponent);
    dashboardService = fixture.debugElement.injector.get(ZoomrxDashboardService);
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
