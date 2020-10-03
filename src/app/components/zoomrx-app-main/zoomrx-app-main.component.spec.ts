import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ZoomrxAppMainComponent } from './zoomrx-app-main.component';

describe('ZoomrxAppMainComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ZoomrxAppMainComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ZoomrxAppMainComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
