import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandPushComponent } from './sand-push.component';

describe('SandPushComponent', () => {
  let component: SandPushComponent;
  let fixture: ComponentFixture<SandPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandPushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
