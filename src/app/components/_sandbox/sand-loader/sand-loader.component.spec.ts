import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandLoaderComponent } from './sand-loader.component';

describe('SandLoaderComponent', () => {
  let component: SandLoaderComponent;
  let fixture: ComponentFixture<SandLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
