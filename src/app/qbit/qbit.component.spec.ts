import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbitComponent } from './qbit.component';

describe('QbitComponent', () => {
  let component: QbitComponent;
  let fixture: ComponentFixture<QbitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
