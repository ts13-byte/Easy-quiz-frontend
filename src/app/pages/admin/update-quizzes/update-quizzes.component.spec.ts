import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizzesComponent } from './update-quizzes.component';

describe('UpdateQuizzesComponent', () => {
  let component: UpdateQuizzesComponent;
  let fixture: ComponentFixture<UpdateQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateQuizzesComponent]
    });
    fixture = TestBed.createComponent(UpdateQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
