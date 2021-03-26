import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSquareComponent } from './sand-square.component';

describe('SandSquareComponent', () => {
  let component: SandSquareComponent;
  let fixture: ComponentFixture<SandSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
