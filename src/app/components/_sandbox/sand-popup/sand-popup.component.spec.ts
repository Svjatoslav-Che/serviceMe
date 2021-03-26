import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandPopupComponent } from './sand-popup.component';

describe('SandPopupComponent', () => {
  let component: SandPopupComponent;
  let fixture: ComponentFixture<SandPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
