import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  ngOnInit(): void {
    const nav = document.querySelector('.container_header');

    window.addEventListener('scroll', function(){
      nav?.classList.toggle('active', window.scrollY>0)
    });
  }

}
