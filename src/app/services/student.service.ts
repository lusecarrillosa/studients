import { PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor() {
    this.students=[
      {
        controlNumber:"18401095",
        age:22,
        career:"ISC",
        name:"Sergio",
        curp:"CASL0001106",
        email:"lusecarrillos@ittepic.edu.mx",
        nip:897,
        photo: "https://picsum.photos/id/237/200/300"
      },
      {
        controlNumber:"18401090",
        age:22,
        career:"ISC",
        name:"Daniel",
        curp:"DALV0001106",
        email:"dacv@ittepic.edu.mx",
        nip:895,
        photo: "https://picsum.photos/id/237/200/300"
      }
    ];
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public removeStudent(pos:number){
    return this.students.splice(pos,1);
  } 

  public getStudentByControlNumber(cn:string):Student{
    let item: Student;
    item = this.students.find((student)=>{
        return student.controlNumber == cn
      });
      return item;
  }

  

  public newStudent(student:Student):void{
    this.students.push(student);
  }

  public editStudent(student:Student):void{
    console.log(student.curp)
    this.students.map(std=>{
      if(std.controlNumber===student.controlNumber){
        console.log("igual");
        return Object.assign(std,student)
      }
      return std;
    });
  }

}
