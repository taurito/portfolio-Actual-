import { Trabajo } from 'src/app/models/trabajo';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tecnologia } from 'src/app/models/tecnologia';

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

  tecnologiasDisponibles: Tecnologia[] = [{nombre:'spring-boot'},
                                {nombre:'angular'},
                                {nombre:'bootstrap'},
                                {nombre:'java'},
                                {nombre:'javascript'},
                                {nombre:'react'},
                                {nombre:'mysql'},
                                {nombre:'postgresql'}];


  constructor(
    private trabajoService: TrabajoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
      image: [''],
      referencia: [''],
      descripcion: [''],
      tecnologias: this.fb.group(this.createTecnologiaControls()),
      urlGit: ['']
    });
    this.cargarTrabajoFormulario();
  }

  createTecnologiaControls() {
    const controls: { [key: string]: FormControl } = {};
    this.tecnologiasDisponibles.forEach(tecnologia => {
      controls[tecnologia.nombre] = new FormControl(false);
    });
    return controls;
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
    this.form.patchValue({
      titulo: [''],
      image: [''],
      referencia: [''],
      descripcion: [''],
      tecnologias:[],
      urlGit:['']
    });
    this.previsualizacion = '';
  }

  onGuardarWork() {
    const formData: FormData = new FormData();
      formData.append('titulo', this.form.get('titulo')!.value);
      formData.append('image', this.form.get('image')!.value);
      formData.append('referencia', this.form.get('referencia')!.value);
      formData.append('descripcion', this.form.get('descripcion')!.value);
      formData.append('urlGit', this.form.get('urlGit')!.value);

      const tecnologiasControl = this.form.get('tecnologias');
      if (tecnologiasControl) {
        const selectedTecnologias = this.tecnologiasDisponibles.filter(tecnologia => tecnologiasControl
          .get(tecnologia.nombre)?.value)
          .map(tecnologia => ({nombre: tecnologia.nombre}));
          formData.append('tecnologias', new Blob([JSON.stringify(selectedTecnologias)], { type: 'application/json' }));
      }

      //imprime en consola detalladamente un formData
      console.log(this.trabajo.idCardWock);
      formData.forEach((value, key) => {
        if (value instanceof Blob) {
          value.text().then((text) => console.log(key + ': ' + text));
        } else {
          console.log(key + ': ' + value);
        }
      });

      const file = this.form.get('image')!.value;


    if (this.trabajo.idCardWock == 0) {
      console.log("guardar trabajo");

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.trabajoService.agregarTrabajo(formData).subscribe({
        next: (response) => {
          console.log('Trabajo creado exitosamente', response);
        },
        error: (error) => {
          console.error('Error al crear el trabajo', error);
        },
      });

    } else {

      console.log("actualizar trabajo");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      console.log(file.name);

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
          this.form.patchValue({
            titulo: this.trabajo.titulo,
            image: [''],
            referencia: this.trabajo.referencia,
            descripcion: this.trabajo.descripcion,
            urlGit: this.trabajo.urlGit
          });

          const tecnologiasFormGroup = this.form.get('tecnologias') as FormGroup;
          this.tecnologiasDisponibles.forEach(tecnologia => {
          const isChecked = this.trabajo.tecnologias.some(t => t.nombre === tecnologia.nombre);
          if (tecnologiasFormGroup.controls[tecnologia.nombre]) {
            tecnologiasFormGroup.controls[tecnologia.nombre].setValue(isChecked);
          }
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

}
