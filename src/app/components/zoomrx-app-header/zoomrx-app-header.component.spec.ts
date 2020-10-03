import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomrxAppHeaderComponent } from './zoomrx-app-header.component';

describe('ZoomrxAppHeaderComponent', () => {
  let component: ZoomrxAppHeaderComponent;
  let fixture: ComponentFixture<ZoomrxAppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomrxAppHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomrxAppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
