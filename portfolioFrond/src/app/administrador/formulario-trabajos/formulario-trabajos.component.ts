import { Trabajo } from 'src/app/models/trabajo';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  public trabajo:Trabajo;


  constructor(private trabajoService:TrabajoService, private router:Router, private sanitizer:DomSanitizer, private fb:FormBuilder, private route: ActivatedRoute){
    this.form = this.fb.group({
      titulo:[''],
      image:[''],
      referencia:[''],
      descripcion:['']
    });

  }

  ngOnInit(): void {
    this.cargarTrabajoFormulario();
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

  cerrarFormulario(){
    this.form = this.fb.group({
      titulo:[''],
      image:[''],
      referencia:[''],
      descripcion:['']
    });
    this.previsualizacion = '';
  }

  onGuardarWork(){
    if(this.trabajo.idCardWock == 0)

    console.log("guardar" + this.trabajo)
  else{
    console.log("editar" + this.trabajo.idCardWock);
    this.trabajo.idCardWock = 0;
  }
    // const formData: FormData = new FormData();
    // formData.append('titulo', this.form.get('titulo')!.value);
    // formData.append('image', this.form.get('image')!.value);
    // formData.append('referencia', this.form.get('referencia')!.value);
    // formData.append('descripcion', this.form.get('descripcion')!.value);

    // this.trabajoService.agregarTrabajo(formData).subscribe({
    //   next: (response) => {
    //     console.log('Trabajo creado exitosamente', response);
    //   },
    //   error: (error) => {
    //     console.error('Error al crear el trabajo', error);
    //   },
    // });
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
  });

  cargarTrabajoFormulario(){
    this.trabajoService.trabajoObs.subscribe({
      next: (trabajoCargado) => {
        this.trabajo = trabajoCargado;
          if(this.trabajo){
            this.form = this.fb.group({
              titulo:this.trabajo.titulo,
              image:this.trabajo.image,
              referencia:this.trabajo.referencia,
              descripcion:this.trabajo.descripcion
            });
            this.previsualizacion = this.trabajoService.getImage(this.trabajo.image);

          }
      },
      error: (error) => {
        console.error('Error al editar el trabajo', error);
      },
    });
  }

}
