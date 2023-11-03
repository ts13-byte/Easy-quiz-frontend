import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizzesComponent } from './load-quizzes.component';

describe('LoadQuizzesComponent', () => {
  let component: LoadQuizzesComponent;
  let fixture: ComponentFixture<LoadQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadQuizzesComponent]
    });
    fixture = TestBed.createComponent(LoadQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
