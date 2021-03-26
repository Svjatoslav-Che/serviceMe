import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSoundsComponent } from './sand-sounds.component';

describe('SandSoundsComponent', () => {
  let component: SandSoundsComponent;
  let fixture: ComponentFixture<SandSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
