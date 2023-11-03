import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  constructor(private categoryService:CategoryService){}

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
  ];
  
  
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

  





