import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.styles.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) {}

   // make subscribe on a component initialization
  public ngOnInit(): void {}

   // make unsubscribe before destroying component
  public ngOnDestroy(): void {}

}
