import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandBubblesComponent } from './sand-bubbles.component';

describe('SandBubblesComponent', () => {
  let component: SandBubblesComponent;
  let fixture: ComponentFixture<SandBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandBubblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
