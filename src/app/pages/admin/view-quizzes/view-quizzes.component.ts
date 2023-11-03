import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { UpdateQuizzesComponent } from '../update-quizzes/update-quizzes.component';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
  
})
export class ViewQuizzesComponent {
quizzes=[
{
qid:23,
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
  qid:24,
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
constructor(private quizService: QuizService,private dialog: MatDialog){}

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

deleteQuiz(quizId: number): void {
  Swal.fire({
    title: 'Confirm Delete',
    text: 'Are you sure you want to delete this quiz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, proceed with deletion
      this.quizService.deleteQuizzes(quizId).subscribe(
        () => {
          // Quiz deleted successfully, reload the quizzes to reflect the updated list
          Swal.fire('Quiz is deleted!','','success');
          this.loadQuizzes();
        },
        (error) => {
          console.log(error);
          Swal.fire('Error occurred', 'Error while deleting the Quiz', 'error');
        }
      );
    }
  });
}


openDialog(quiz) {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.data = quiz;

  const dialogRef = this.dialog.open(UpdateQuizzesComponent, dialogConfig);

    // Subscribe to the dialog's afterClosed event to handle actions after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Quiz was updated, reload the quizzes 
        this.loadQuizzes();
      }
    });
}

}
