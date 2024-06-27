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
  trabajoBacio:Trabajo = {
    idCardWock : 0,
    titulo : '',
    image : '',
    referencia :'',
    descripcion : ''
  }


  constructor(private trabajoService:TrabajoService, private router: Router,
    private route: ActivatedRoute, private loginService:LoginService){

    }
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

  nuevoTrabajo(){
    this.trabajoService.cargarTrabajo(this.trabajoBacio);
  }

  getImageUrl(imagen: String){
    return this.trabajoService.getImage(imagen);
  }

  editarTrabajo(trabajo:Trabajo){
      this.trabajoService.cargarTrabajo(trabajo);
  }

  eliminar(id:number){
    console.log(id)
    this.trabajoService.eliminarTrabajo(id).subscribe({
      next: (response) => {
        console.log('Trabajo eliminado exitosamente', response);
      },
      error: (error) => {
        console.error('Error eliminar el trabajo', error);
      },
    });
  }

}
