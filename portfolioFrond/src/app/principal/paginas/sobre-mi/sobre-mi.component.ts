import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }

  openPdf(){
    const pdfUrl = 'assets/cv/SAUL JAIMES MORALES.pdf';
    window.open(pdfUrl, '_blank');
  }
}
