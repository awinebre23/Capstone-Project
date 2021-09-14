import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHomeComponent } from './submit-home.component';

describe('SubmitHomeComponent', () => {
  let component: SubmitHomeComponent;
  let fixture: ComponentFixture<SubmitHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
