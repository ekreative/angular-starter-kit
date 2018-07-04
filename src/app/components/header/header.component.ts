import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.styles.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private bus: BusService,
    private events: EventsService,
    private router: Router
  ) {}

  public locationCheck(): boolean {
    return !window.location.href.match('login') && !window.location.href.match('registration');
  }

  // subscribe on validation success/failure
  public subscribe(): void {
  }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
  }

   // make subscribe on a component initialization
  public ngOnInit(): void {
    this.subscribe();
  }

   // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }

}
