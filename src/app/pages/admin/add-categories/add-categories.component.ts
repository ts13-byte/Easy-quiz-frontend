import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  category={
    title:'',
    description:'',
  };
  constructor(private categoryService:CategoryService,private snack:MatSnackBar){}
  
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open("Title is required","OK",{
          duration:3000,
          verticalPosition:'top',
         
        });
      return;
    }

    this.categoryService.addCategories(this.category).subscribe(
      (data:any)=>{
          this.category.title='';
          this.category.description='';
          console.log(data);
          Swal.fire('New Category added','','success');
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
