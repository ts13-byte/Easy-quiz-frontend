import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
  };

  categories=[
    {
      cid:23,
      title:'programming languages'
    },
    {
      cid:23,
      title:'programming languages'
    },
    {
      cid:23,
      title:'programming languages'
    },

  ];

  formSubmit(){}
}
