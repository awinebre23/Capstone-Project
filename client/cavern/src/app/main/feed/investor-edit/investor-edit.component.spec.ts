import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorEditComponent } from './investor-edit.component';

describe('InvestorEditComponent', () => {
  let component: InvestorEditComponent;
  let fixture: ComponentFixture<InvestorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
