import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { interval, takeWhile } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { MinutesSecondsFormatPipe } from '../minutes-seconds-format.pipe';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent {
  qid;
  questions;
  marksScored=0;
  correctAnswers=0;
  inCorrectAnswers=0;
  attemptedQuestions=0;
  
  isSubmit=false;
  mode: ProgressSpinnerMode = 'determinate';
  timer:number;
  totalTime;
  timerSubscription: any;
  evaluatedResponse;

 constructor(private loactionStrategy:LocationStrategy, private route:ActivatedRoute,private questionService:QuestionService){}
 
 ngOnInit(){
  this.preventBackButton();
  this.qid=this.route.snapshot.params['qid'];
  console.log(this.qid);
   // Check if the 'fullscreen' query parameter is present
   const queryParams = new URLSearchParams(window.location.search);
   if (queryParams.get('fullscreen') === 'true') {
     this.openFullscreen();
   }
   this.loadQuestionOfQuiz();
  
 }

 preventBackButton(){
  history.pushState(null,null,location.href);
  this.loactionStrategy.onPopState(()=>{
    history.pushState(null,null,location.href);
  })
 }

 openFullscreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

loadQuestionOfQuiz(){
  this.questionService.getQuestionsOfAQuiz(this.qid).subscribe(
    (data:any)=>{
      this.questions=data;
      this.timer = this.questions.length * 2 * 60;
      this.totalTime=this.timer;
      console.log("timer:"+this.timer);
     
     
      console.log(this.questions);
      this.startTimer();
    },
    (error)=>{
      console.log(error);
    }
  );
}

submitQuiz(){
  Swal.fire({
    title: 'Submit Quiz',
    text: 'Do you want to submit the quiz?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
        this.evaluateQuiz();
    }
      });
  }


evaluateQuiz(){

this.questionService.evalQuiz(this.questions).subscribe(
  (data:any)=>{
      this.isSubmit=true;
      this.evaluatedResponse=data;
      console.log(this.evaluatedResponse);
      this.marksScored=data.marksScored;
      this.attemptedQuestions=data.attemptedQuestions;
      this.correctAnswers=data.correctAnswers;
      this.inCorrectAnswers=data.incorrectAnswers;
      
  },
  (error:any)=>{
      console.log(error);
  }
);
}


startTimer(){
  let t:any=window.setInterval(()=>{
    if(this.timer<=0){
      this.evaluateQuiz();
      clearInterval(t);
    }else{
      this.timer--;
    }
  },1000);
   
  }

  printPage(){
    window.print();
  }


  getFormattedNumber(): string {
   
    return this.marksScored.toFixed(2);
  }

}
