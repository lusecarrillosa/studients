import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {

  public student: Student;
  public student2: Student;
  public ncontrol: string;
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(private studentService: StudentService, private fb: FormBuilder,private aRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    this.myForm = this.fb.group(
      {
        
        name:["", Validators.compose([Validators.required])],
        curp:["", Validators.compose([Validators.required])],
        age:["", Validators.compose([Validators.required,Validators.min(17)])],
        nip:["", Validators.compose([Validators.required,Validators.min(4),Validators.max(1000)])],
        email:["", Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")])],
        career:["", Validators.compose([Validators.required])],
        url:["", Validators.compose([Validators.required])]
      }
    );

    this.validationMessages = {
      
      'name': [
        {type: 'required', message: "Nombre obligatorio"}
      ],
      'curp': [
        {type: 'required', message: "CURP obligatorio"}
      ],
      'age': [
        {type: 'min', message: "Debe ser mayor de 17"},
        {type: 'required', message: "Edad obligatoria"}
      ],
      'nip': [
        {type: 'min', message: "Debe ser mayor de 8"},
        {type: 'max', message: "Debe ser menor de 1000"},
        {type: 'required', message: "NIP obligatorio"}
      ],
      'email': [
        {type: 'pattern', message: "Introduzca correo valido"},
        {type: 'required', message: "Correo obligatorio"}
      ],
      'career': [
        {type: 'required', message: "Carrera obligatorio"}
      ],
      'url': [
        {type: 'required', message: "URL obligatorio"}
      ]
    }

    this.aRoute.queryParams.subscribe(
      (params)=>{
        //console.log(params)
        this.student = this.studentService.getStudentByControlNumber(params.controlNumber);
        this.ncontrol=this.student.controlNumber;
      }
    )

  }
  
  public editStudent(data): void {
    this.student2 = data;
    this.student2.controlNumber=this.ncontrol;
    console.log(this.student2.name);
    this.studentService.editStudent(this.student2);
    //this.presentToast('bottom','Estudiante agregado');
    this.router.navigate(['/home']);
  }
}



