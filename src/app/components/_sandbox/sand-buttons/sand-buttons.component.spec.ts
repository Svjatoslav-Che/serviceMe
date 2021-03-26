import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandButtonsComponent } from './sand-buttons.component';

describe('SandButtonsComponent', () => {
  let component: SandButtonsComponent;
  let fixture: ComponentFixture<SandButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
