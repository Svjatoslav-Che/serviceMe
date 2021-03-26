import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSmartBoxComponent } from './sand-smart-box.component';

describe('SandSmartBoxComponent', () => {
  let component: SandSmartBoxComponent;
  let fixture: ComponentFixture<SandSmartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSmartBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSmartBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
