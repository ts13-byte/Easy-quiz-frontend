import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.css']
})
export class LoadQuizzesComponent {

catId;
quizzes;
constructor(
  private route:ActivatedRoute, private quizService:QuizService
){}

ngOnInit(){
 this.route.params.subscribe((params)=>{
  this.catId=params['catId'];
  console.log(params);
  if(this.catId==0){
    console.log("loading all the quizzes!");
    this.quizService.quizzes().subscribe(
      (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error occurred', 'Error occurred while loading all the quizzes!', 'error');
      }
    );
  }
  else{
    console.log("loading the specific quizzes!!");
    this.quizService.getAllQuizzesOfACategory(this.catId).subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error occurred', 'Error occurred while loading the quiz', 'error');
      }
      
    );
  }
});
}

}
