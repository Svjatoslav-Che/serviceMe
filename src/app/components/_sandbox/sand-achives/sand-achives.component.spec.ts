import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAchivesComponent } from './sand-achives.component';

describe('SandAchivesComponent', () => {
  let component: SandAchivesComponent;
  let fixture: ComponentFixture<SandAchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAchivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
