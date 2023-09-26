import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { UpdateCategoriesComponent } from '../update-categories/update-categories.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {
constructor(private categoryService:CategoryService,private dialog: MatDialog){}
categories=[{
  cid:23,
  title:"programming",
  description:"this is a test for categories",
},
{
  cid:24,
  title:"GK",
  description:"this is a test for categories",
},
{
  cid:25,
  title:"Aptitude",
  description:"this is a test for categories",
}
]


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

deleteCategory(categoryId: number): void {
  this.categoryService.deleteCategory(categoryId).subscribe(
    () => {
      // Category deleted successfully, reload the categories to reflect the updated list
      this.loadCategories();
    },
    (error) => {
      console.log(error);
      Swal.fire("Error occurred", "Error while deleting the category", "error");
    }
  );
}

openDialog(category) {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.data = category;

  const dialogRef = this.dialog.open(UpdateCategoriesComponent, dialogConfig);

    // Subscribe to the dialog's afterClosed event to handle actions after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Category was updated, reload the categories
        this.loadCategories();
      }
    });
}
}
