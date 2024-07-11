import { Tecnologia } from "./tecnologia";

export interface Trabajo{
  idCardWock: number;
  titulo:String;
  image:string;
  referencia:String;
  descripcion:String;
  tecnologias?: Tecnologia[];
}
