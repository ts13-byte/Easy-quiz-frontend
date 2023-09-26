import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {
quizzes=[
{
qid:'23',
title:'Java Quiz',
description:'The Java programming language is a general-purpose programming language that is based on the OOPs concept',
maxMarks:'100',
numberOfQuestions:'25',
active:true,
category:{  cid:23,
  title:"programming",
  description:"this is a test for Quizzes",

}
},
{
  qid:'24',
  title:'Java Quiz',
  description:'The Java programming language is a general-purpose programming language that is based on the OOPs concept',
  maxMarks:'100',
  numberOfQuestions:'25',
  active:true,
  category:{
    cid:23,
    title:"programming",
    description:"this is a test for Quizzes",
  }
},
];
constructor(private quizService: QuizService){}

ngOnInit():void{
  this.loadQuizzes();
 }

loadQuizzes(): void{
this.quizService.quizzes().subscribe((data:any)=>{
this.quizzes=data;
console.log(this.quizzes);
},
(error)=>{
console.log(error);
Swal.fire("Error occured","Error in loading data from the server","error");
})
}

}
