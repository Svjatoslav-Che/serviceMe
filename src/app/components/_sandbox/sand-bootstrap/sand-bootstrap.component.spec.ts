import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandBootstrapComponent } from './sand-bootstrap.component';

describe('SandBootstrapComponent', () => {
  let component: SandBootstrapComponent;
  let fixture: ComponentFixture<SandBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandBootstrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
