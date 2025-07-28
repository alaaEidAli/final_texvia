import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolutionsService } from '../../core/services/Solutions/solutions.service';
import { Isolutions } from '../../shared/Interfaces/Isolution/isolutions';
import { IndustriesService } from '../../core/services/industries/industries.service';
import { Iindustry } from '../../shared/Interfaces/Iindustry/iindustry';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  implements OnInit{
email:string ='sales@texviatech.com'

private  solutionsService= inject(SolutionsService)
private  industriesService= inject(IndustriesService)
SolutionsData:Isolutions[]= []
industryData :Iindustry[] =[]

ngOnInit(): void {
  this.getSolutionsDate() ;
  this.getIndustriesData() ;
}



// get Solutions for api
getSolutionsDate():void{
this.solutionsService.getSolutions().subscribe({
  next:(res) =>{
    this.SolutionsData = res.data ;

  },
  error :(err) =>{
  }
})
}
//get industries from api 
getIndustriesData():void {
this.industriesService.getIndustries().subscribe({
  next:(res) =>{
    this.industryData = res.data ;
    console.log(this.industryData);
  },
  error:(err) =>{

  }
})
}


}
