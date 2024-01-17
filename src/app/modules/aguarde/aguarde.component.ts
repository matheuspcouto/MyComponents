import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Rotas } from 'src/app/shared/enums/rotas-enum';

@Component({
  selector: 'app-aguarde',
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export class AguardeComponent implements OnInit {

  loading = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  days: number = 0;
  animate: boolean = false;
  timer: any;
  dataAniversario = new Date('2023-10-13T03:00:00.817Z');

  constructor(private router: Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    const timer = setInterval(() => {
      const pararContagem = this.contagem();
      if (pararContagem){ clearInterval(timer); sessionStorage.setItem('siteAtivo', 'true'); this.router.navigate([Rotas.LOGIN]); }
    }, 1000);

  }

  contagem() {
    let dataAtual = new Date();
    const diffInMs = Math.abs(this.dataAniversario.getTime() - dataAtual.getTime());
    this.days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return this.days >= 0 && this.hours >= 0 && this.minutes >= 0 && this.seconds >= 0;
  }
}
