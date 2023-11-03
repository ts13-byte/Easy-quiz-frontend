import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent {
  qid;
  qTitle;
  questions=[];

  constructor(private _route:ActivatedRoute, private questionService:QuestionService){}

  ngOnInit():void{
   this.qid= this._route.snapshot.params['qid'];
  this.qTitle=this._route.snapshot.params['title'];
  this.loadQuestions();

  }

  loadQuestions():void{
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log('error occurred!');
      }
    )

  }

  deleteQuestion(quesid){
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.questionService.deleteQuestion(quesid).subscribe(
          () => {
            // Quiz deleted successfully, reload the quizzes to reflect the updated list
            Swal.fire('Question is deleted!','','success');
            this.loadQuestions();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error occurred', 'Error while deleting the Question', 'error');
          }
        );
      }
    });
  }


}
