import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { Trabajo } from 'src/app/models/trabajo';
import { LoginService } from 'src/app/servicios/login.service';
import { TrabajoService } from 'src/app/servicios/trabajo.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit{
  trabajos:Trabajo[];
  userLoginOn:boolean=false;

  constructor(private trabajoService:TrabajoService, private router: Router,
    private route: ActivatedRoute, private loginService:LoginService){}
  ngOnInit(): void {

    this.getTrabajos();

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
      }
    })

  }

  getTrabajos(){
    this.trabajoService.listarTrabajos().subscribe((data) =>{
      this.trabajos = data;
    });
  }

  getImageUrl(imagen: String){
    return `http://localhost:8080/card/imagen/${imagen}`;
  }

}
