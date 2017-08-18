import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateCanvasComponent } from './gate-canvas.component';

describe('GateCanvasComponent', () => {
  let component: GateCanvasComponent;
  let fixture: ComponentFixture<GateCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
