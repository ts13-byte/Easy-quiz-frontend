import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent {
  
  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active: true as boolean,
    category:{
      cid:''
    },
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

  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private quizService:QuizService){}

  ngOnInit():void{
    this.loadCategories();
  }

  loadCategories(): void{
    this.categoryService.categories().subscribe((data:any)=>{
    this.categories=data;
    console.log(this.categories)
    },
    (error)=>{
    console.log(error);
    Swal.fire("Error occured","Error in loading data from the server","error");
    })
    }
  
  formSubmit(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snack.open("Title is required","OK",{
          duration:3000,
          verticalPosition:'top',
         
        });
      return;
    }

    if(this.quiz.category==null || this.quiz.category.cid==''){
      this.snack.open("Category must be chosen!","OK",{
        duration:3000,
        verticalPosition:'top',
       
      });
    return;
    }
    this.quizService.addquizzes(this.quiz).subscribe(
      (data:any)=>{
          console.log(data);
          Swal.fire('New Quiz added','','success');
          this.quiz={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestions:'',
            active: true as boolean,
            category:{
              cid:''
            },
      }},
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
