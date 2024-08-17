import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreStartupComponent } from './pre-startup.component';

describe('PreStartupComponent', () => {
  let component: PreStartupComponent;
  let fixture: ComponentFixture<PreStartupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreStartupComponent]
    });
    fixture = TestBed.createComponent(PreStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
