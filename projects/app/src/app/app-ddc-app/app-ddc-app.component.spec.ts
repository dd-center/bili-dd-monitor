import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDdcAppComponent } from './app-ddc-app.component';

describe('AppDdcAppComponent', () => {
  let component: AppDdcAppComponent;
  let fixture: ComponentFixture<AppDdcAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDdcAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDdcAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
