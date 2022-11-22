import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages: Object;



  constructor(private studentService: StudentService, private fb: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.myForm = this.fb.group(
      {
        controlNumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern('^[0-9]+$')])],
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
      'controlNumber': [
        {type: 'required', message: "Numero de control obligatorio"},
        {type: 'minlength', message: "El numero de control es de 8 caracteres"},
        {type: 'maxlength', message: "El numero de control es de 8 caracteres"},
        {type: 'pattern', message: "Error en formato de NC"}        
      ],
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
  }

  public newStudent(data): void {
    this.student = data;
    this.studentService.newStudent(this.student);
    //this.presentToast('bottom','Estudiante agregado');
    this.router.navigate(['/home']);
  }

}
