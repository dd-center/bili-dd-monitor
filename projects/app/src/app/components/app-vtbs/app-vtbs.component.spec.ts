import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVtbsComponent } from './app-vtbs.component';

describe('AppVtbsComponent', () => {
  let component: AppVtbsComponent;
  let fixture: ComponentFixture<AppVtbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVtbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVtbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
