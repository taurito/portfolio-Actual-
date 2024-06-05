import { Trabajo } from 'src/app/models/trabajo';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TrabajoService } from 'src/app/servicios/trabajo.service';

@Component({
  selector: 'app-formulario-trabajos',
  templateUrl: './formulario-trabajos.component.html',
  styleUrls: ['./formulario-trabajos.component.css']
})
export class FormularioTrabajosComponent implements OnInit{

  tituloInput: String;
  imageInput: String;
  DesTextAreA: String;
  RefInput: String;



  public file: File;
  public previsualizacion: string;

  card:Trabajo;

  constructor(private trabajoService:TrabajoService, private router:Router, private sanitizer:DomSanitizer){}
  ngOnInit(): void {

  }

  capturarFile(event:any){
    this.file = event.target.files[0];
    this.extraerBase64(this.file).then((imagenDeco: any) =>{
      this.previsualizacion = imagenDeco.base;
      this.imageInput = this.file.name;
      console.log("recuperacion del nombre de la imagen:" + this.file.name);
    })
  }

  cerrarFormulario(){}

  onGuardarWork(){

  }

  extraerBase64 = async ($event:any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return console.log(e);
    }
  })

}
