import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorManageComponent } from './investor-manage.component';

describe('InvestorManageComponent', () => {
  let component: InvestorManageComponent;
  let fixture: ComponentFixture<InvestorManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
