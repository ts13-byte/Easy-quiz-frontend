import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quizzes',
  templateUrl: './update-quizzes.component.html',
  styleUrls: ['./update-quizzes.component.css'],
  
})
export class UpdateQuizzesComponent {
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
  editCategoryForm: FormGroup;
  quiz: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateQuizzesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private categoryService:CategoryService,
    

  ) {
    this.quiz = { ...data }; // Create a copy of the quiz data
    this.editCategoryForm = this.formBuilder.group({
      title: [this.quiz.title, Validators.required],
      description: [this.quiz.description, Validators.required],
      maxMarks: [this.quiz.maxMarks],
      numberOfQuestions: [this.quiz.numberOfQuestions],
      active: [this.quiz.active],
      category: [this.quiz.category.cid]
    });
  }

  updateQuiz() {
    if (this.editCategoryForm.valid) {
      // Prepare the data to send to the API
      //console.log('Before updating: '+this.quiz);
      
        this.quiz.title = this.editCategoryForm.value.title;
        this.quiz.description=this.editCategoryForm.value.description;
        this.quiz.maxMarks=this.editCategoryForm.value.maxMarks;
        this.quiz.numberOfQuestions= this.editCategoryForm.value.numberOfQuestions,
        this.quiz.active= this.editCategoryForm.value.active;
        this.quiz.category={
          cid: this.editCategoryForm.value.category
        };
     

      // Call your API service to update the quiz
      this.quizService.updateQuizzes(this.quiz).subscribe(
        (response) => {
          // Handle the response from the API as needed
          //console.log('Quiz updated successfully:', response);

          // Close the dialog
          Swal.fire('Quiz updated ','','success');
          this.dialogRef.close();
         
        },
        (error) => {
          // Handle API error
          console.error('Error updating quiz:', error);
        }
      );

    }
    
  }
  closeDialog(): void {
    // Close the dialog without making changes
    this.dialogRef.close();
  }

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
}
