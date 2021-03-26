import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAssistComponent } from './sand-assist.component';

describe('SandAssistComponent', () => {
  let component: SandAssistComponent;
  let fixture: ComponentFixture<SandAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAssistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
