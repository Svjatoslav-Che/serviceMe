import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAnimationsComponent } from './sand-animations.component';

describe('SandAnimationsComponent', () => {
  let component: SandAnimationsComponent;
  let fixture: ComponentFixture<SandAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAnimationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
