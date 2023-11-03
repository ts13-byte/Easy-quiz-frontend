import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent {

  public Editor = ClassicEditor;
  
  qid;
  qTitle;
  question={
    quiz:{

    },
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private route:ActivatedRoute,private questionService:QuestionService,private snack:MatSnackBar){}

  ngOnInit(){
    this.qid = this.route.snapshot.params['qid'];
    this.qTitle=this.route.snapshot.params['title'];
    console.log(this.qid);
  
    this.question.quiz['qid']=this.qid;
  }

  formSubmit(){
      if(this.question.content.trim()=='' || this.question.content==null){
        this.snack.open("Enter some Content!","OK",{
          duration:3000,
          verticalPosition:'top',
         
        });
      return;
      }
      if(this.question.option1.trim()=='' || this.question.option1==null 
      || this.question.option2.trim()=='' || this.question.option2==null){
        this.snack.open("Enter atleast option1 and option2 !","OK",{
          duration:3000,
          verticalPosition:'top',
         
        });
      return;
      }
      if(this.question.answer.trim()=='' || this.question.answer==null){
        this.snack.open("Answer must not be left blank!","OK",{
          duration:3000,
          verticalPosition:'top',
         
        });
      return;
      }
      this.questionService.addNewQuestion(this.question).subscribe(
        (data:any)=>{
            console.log(data);
            Swal.fire('New Question added','','success');
            this.question={
              quiz:{
          
              },
              content:'',
              image:'',
              option1:'',
              option2:'',
              option3:'',
              option4:'',
              answer:'',
            };
           },
        (error)=>{
            //error
            console.log(error);
            this.snack.open('something went wrong','',{
              duration:3000,
              verticalPosition:'top',
            });
        }
      )
  
  }
}
