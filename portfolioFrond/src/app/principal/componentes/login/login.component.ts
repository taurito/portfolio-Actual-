import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginError:string="";
  loginForm = this.formBuilder.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]],
  })

  constructor(private formBuilder:FormBuilder, private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {

  }

  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.buscarUsuario(this.loginForm.value as LoginRequest).subscribe({
        next: (userData)=> {
          console.log(userData);
        },
        error: (errorData) =>{
          console.log(errorData);
          this.loginError=errorData;
        },
        complete: () =>{
          console.info("Login completo");
          this.router.navigate(['./admin']);
          (<any>$("#modalLogin")).modal('hide');
          this.loginForm.reset();
        }
      })


    }
    else{
      alert("error al ingresar los datos")
    }
  }
  cerrar(){
    this.loginForm.reset();
  }

}
