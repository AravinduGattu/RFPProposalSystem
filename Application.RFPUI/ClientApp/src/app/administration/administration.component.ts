import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { LocationsComponent } from '../administration/locations/locations.component';
import { MilestonesComponent } from '../administration/milestones/milestones.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  routes: Routes;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routes = [
      {
        path: 'locations',
        data: {
          title: 'Locations',
        }
      },
      {
        path: 'milestones',
        data: {
          title: 'Milestones',
        }
      }
    ];
  }

}
