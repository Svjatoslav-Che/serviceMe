import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareHeaderComponent } from './square-header.component';

describe('SquareHeaderComponent', () => {
  let component: SquareHeaderComponent;
  let fixture: ComponentFixture<SquareHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
