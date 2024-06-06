import { Trabajo } from 'src/app/models/trabajo';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-trabajos',
  templateUrl: './formulario-trabajos.component.html',
  styleUrls: ['./formulario-trabajos.component.css']
})
export class FormularioTrabajosComponent implements OnInit{
  form: FormGroup;

  public previsualizacion: string;
  public filePrevi:File;

  constructor(private trabajoService:TrabajoService, private router:Router, private sanitizer:DomSanitizer, private fb:FormBuilder){
    this.form = this.fb.group({
      titulo:[''],
      image:[''],
      referencia:[''],
      descripcion:['']
    });
  }

  ngOnInit(): void {

  }

  capturarFile(event:any){
    this.filePrevi = event.target.files[0];
    console.log(this.filePrevi);
      this.form.patchValue({
        image:this.filePrevi
      });

    this.extraerBase64(this.filePrevi).then((imagenDeco: any) =>{
      this.previsualizacion = imagenDeco.base;
    })
  }

  cerrarFormulario(){}

  onGuardarWork(){
    const formData: FormData = new FormData();
    formData.append('titulo', this.form.get('titulo')!.value);
    formData.append('image', this.form.get('image')!.value);
    formData.append('referencia', this.form.get('referencia')!.value);
    formData.append('descripcion', this.form.get('descripcion')!.value);
    console.log(formData)

    this.trabajoService.agregarTrabajo(formData).subscribe(
      (response) =>{
        console.log('Trabajo creado exitosamente', response);
      },
      (error) => {
        console.error('Error al crear el trabajo', error);
      }
    );
    formData.forEach((value, key) => {
      console.log(key, value);
    });
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
