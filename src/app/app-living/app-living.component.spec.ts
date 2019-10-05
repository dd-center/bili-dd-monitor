import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLivingComponent } from './app-living.component';

describe('AppLivingComponent', () => {
  let component: AppLivingComponent;
  let fixture: ComponentFixture<AppLivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
