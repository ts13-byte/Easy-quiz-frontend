import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-startup',
  templateUrl: './pre-startup.component.html',
  styleUrls: ['./pre-startup.component.css']
})
export class PreStartupComponent {
qid;
quiz;
constructor(private route:ActivatedRoute,private quizService:QuizService,private router:Router){}

ngOnInit(){
  this.qid=this.route.snapshot.params['qid'];

  this.quizService.getQuiz(this.qid).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error occurred', 'Error occurred while loading the quiz', 'error');
    }
  );
}
startQuiz() {
  Swal.fire({
    title: 'Start Quiz',
    text: 'Do you want to start the quiz?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked "Yes," so you can proceed to start the quiz
      this.router.navigate(['/start/'+this.qid], { queryParams: { fullscreen: 'true' } });
    } else {
      // User clicked "No," you can handle this as needed
    }
  });
}
}
