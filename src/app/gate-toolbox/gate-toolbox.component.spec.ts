import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateToolboxComponent } from './gate-toolbox.component';

describe('GateToolboxComponent', () => {
  let component: GateToolboxComponent;
  let fixture: ComponentFixture<GateToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
