import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVListComponent } from './app-v-list.component';

describe('AppVListComponent', () => {
  let component: AppVListComponent;
  let fixture: ComponentFixture<AppVListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
