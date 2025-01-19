import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  inputType = "password";
  visible = false;

  constructor(
    private fb: FormBuilder, 
    private authServices: AuthService,
    private router: Router,
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



      Login():void{
        console.log("presionado");
        
        if(this.form.invalid){
        return Object.values(this.form.controls).forEach((controls)=>{
        
          controls.markAllAsTouched();
        })
        
        }
        
        this.authServices.login(this.form.value).subscribe((resp)=>{
        if(resp.isSucces){
          console.log(resp)
        this.router.navigate(["/"]);
        }
        
        
        })
        
        
        }

        toggleVisibility() {
          if (this.visible) {
            this.inputType = "password";
            this.visible = false;
            this.cd.markForCheck();
          } else {
            this.inputType = "text";
            this.visible = true;
            this.cd.markForCheck();
          }
        }
        







}
