import { Component } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students:Student[];

  constructor(private studentServices: StudentService,private router: Router) {
    this.students=this.studentServices.getStudents();
  }

  removeStudent(pos: number){
    this.studentServices.removeStudent(pos);
  }

  public getStudentByControlNumber(cn: string):void{
    this.router.navigate(
      ['/view-student'],
      {
        queryParams: {controlNumber: cn}
      }
    )
  }

  public editStudentByControlNumber(cn: string):void{
    this.router.navigate(
      ['/edit-student'],
      {
        queryParams: {controlNumber: cn}
      }
    )
  }

  
  public addStudent(): void {
    this.router.navigate(['/new-student']);
  }
  
}
