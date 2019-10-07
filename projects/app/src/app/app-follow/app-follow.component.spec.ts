import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFollowComponent } from './app-follow.component';

describe('AppFollowComponent', () => {
  let component: AppFollowComponent;
  let fixture: ComponentFixture<AppFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
