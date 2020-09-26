import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirySearchComponent } from './enquiry-search.component';

describe('EnquirySearchComponent', () => {
  let component: EnquirySearchComponent;
  let fixture: ComponentFixture<EnquirySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquirySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
