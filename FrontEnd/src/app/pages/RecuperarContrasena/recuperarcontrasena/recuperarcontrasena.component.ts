import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../../Auth/Services/auth.service';

@Component({
  selector: 'app-recuperarcontrasena',

  templateUrl: './recuperarcontrasena.component.html',
  styleUrl: './recuperarcontrasena.component.scss'
})
export class RecuperarcontrasenaComponent implements OnInit {

  form!: FormGroup;
  inputType = "password";
  visible = false;

  constructor(
    private fb: FormBuilder, 
    private authServices: AuthService,

    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      credenciales: ["", [Validators.required]], // Email validation added
      password: ["", [Validators.required]]
    });
  }





Recuperar() {
throw new Error('Method not implemented.');
}
toggleVisibility() {
throw new Error('Method not implemented.');
}

}
