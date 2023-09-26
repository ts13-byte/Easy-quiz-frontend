import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css']
})
export class UpdateCategoriesComponent {
  editCategoryForm: FormGroup;
  category: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private categoryService:CategoryService
  ) {
    this.category = { ...data }; // Create a copy of the category data
    this.editCategoryForm = this.formBuilder.group({
      title: [this.category.title, Validators.required],
      description: [this.category.description, Validators.required],
    });
  }

  updateCategory(): void {
    if (this.editCategoryForm.valid) {
      // Update the category object with the changes
      console.log(this.category);
      this.category.title = this.editCategoryForm.value.title;
      this.category.description = this.editCategoryForm.value.description;
      console.log('Updated Category:', this.category);

      // Emit the updated category back to the parent component
      this.categoryService.updateCategory(this.category).subscribe(
        (updatedCategory) => {
          // The API call was successful, and the category was updated.
          // You can handle the response here if needed.
          
          // Emit the updated category back to the parent component
          Swal.fire('Category updated ','','success');
          this.dialogRef.close(updatedCategory);
        },
        (error) => {
          // Handle the error, such as displaying an error message.
          console.error(error);
        }
      );
    }
    
  }

  closeDialog(): void {
    // Close the dialog without making changes
    this.dialogRef.close();
  }
}
