import { Trabajo } from 'src/app/models/trabajo';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-trabajos',
  templateUrl: './formulario-trabajos.component.html',
  styleUrls: ['./formulario-trabajos.component.css'],
})
export class FormularioTrabajosComponent implements OnInit {
  form: FormGroup;

  public previsualizacion: string;
  public filePrevi: File;
  public trabajo: Trabajo;
  public imagenFile:File;


  constructor(
    private trabajoService: TrabajoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      titulo: [''],
      image: [''],
      referencia: [''],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.cargarTrabajoFormulario();
  }

  capturarFile(event: any) {
    this.filePrevi = event.target.files[0];
    console.log(this.filePrevi);
    this.form.patchValue({
      image: this.filePrevi,
    });

    this.extraerBase64(this.filePrevi).then((imagenDeco: any) => {
      this.previsualizacion = imagenDeco.base;
    });
  }

  cerrarFormulario() {
    this.form = this.fb.group({
      titulo: [''],
      image: [''],
      referencia: [''],
      descripcion: [''],
    });
    this.previsualizacion = '';
  }

  onGuardarWork() {
    const formData: FormData = new FormData();
      formData.append('titulo', this.form.get('titulo')!.value);
      formData.append('image', this.form.get('image')!.value);
      formData.append('referencia', this.form.get('referencia')!.value);
      formData.append('descripcion', this.form.get('descripcion')!.value);


      const file = this.form.get('image')!.value;


    if (this.trabajo.idCardWock == 0) {
      console.log("guardar trabajo");

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      console.log(file.name);

      this.trabajoService.agregarTrabajo(formData).subscribe({
        next: (response) => {
          console.log('Trabajo creado exitosamente', response);
        },
        error: (error) => {
          console.error('Error al crear el trabajo', error);
        },
      });

    } else {

      console.log("actulizar trabajo");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      console.log(file.name);

      // if(this.trabajo.image == file.name){
      //   console.log("guardar el trabajo sin modificar la imagen");
      // }else{
      //   console.log("guardar el trabajo con la imagen modificada")
      // }


      this.trabajoService.actualizarTrabajo(this.trabajo.idCardWock, formData).subscribe({
        next: (response) => {
          console.log('Trabajo creado exitosamente', response);
        },
        error: (error) => {
          console.error('Error al crear el trabajo', error);
        },
      });
    }
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return console.log(e);
      }
    });

  cargarTrabajoFormulario() {
    this.trabajoService.trabajoObs.subscribe({
      next: (trabajoCargado) => {
        this.trabajo = trabajoCargado;
        if (this.trabajo.idCardWock != 0) {
          const file = this.trabajo.image;
          this.trabajoService.getFile(file).subscribe({
            next: (resFile) =>{
              this.imagenFile = new File([resFile], file, {type: resFile.type, lastModified: Date.now()});
              this.form.patchValue({
                image: this.imagenFile,
              });
              console.log(this.imagenFile);
            },
            error: (error) => {
              console.error('imagen no fue convertido', error);
            },

          });
          this.form = this.fb.group({
            titulo: this.trabajo.titulo,
            image: [''],
            referencia: this.trabajo.referencia,
            descripcion: this.trabajo.descripcion,
          });
          this.previsualizacion = this.trabajoService.getImage(
            this.trabajo.image
          );
          console.log(this.trabajo);
        }
      },
      error: (error) => {
        console.error('Error al editar el trabajo', error);
      },
    });
  }

  // extraerFile(file:string){
  //   this.trabajoService.getFile(file).subscribe({
  //     next: (resFile) =>{
  //       return this.imagenFile = new File([resFile], file, {type: resFile.type, lastModified: Date.now()});
  //     },
  //     error: (error) => {
  //       console.error('imagen no fue convertido', error);
  //     },

  //   });

  // }
}
