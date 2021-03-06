import { Routes, Route } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { ProposalsComponent } from '../proposals/proposals.component';
import { NewProposalComponent } from '../proposals/new-proposal/new-proposal.component';
import { ViewProposalComponent } from '../proposals/view-proposal/view-proposal.component';
import { AdministrationComponent } from '../administration/administration.component';
import { PlannerViewComponent } from '../proposals/planner-view/planner-view.component';
import { PlannerProposalComponent } from '../proposals/planner-proposal/planner-proposal.component';
import { PlannerNameComponent } from '../proposals/planner-name/planner-name.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';

import { LocationsComponent } from '../administration/locations/locations.component';
import { MilestonesComponent } from '../administration/milestones/milestones.component';

import { RouteGuardService } from './route-guard.service';
import { ProposalUsers } from '../global/enum';


export const newProposalRoutes = [
  {
    path: 'plannerProposal/:Id',
    component: PlannerProposalComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Planner Proposal',
      class: 'glyphicon-copy',
      menu: false,
      users: [ProposalUsers.SalesLead]
    }
  },
  {
    path: 'plannerName',
    component: PlannerNameComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Planner Proposal',
      class: 'glyphicon-copy',
      menu: false,
      users: [ProposalUsers.SalesLead]
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/new/plannerName'
  }
]

export const viewProposalRoutes = [
  {
    path: 'view/:Id',
    component: PlannerViewComponent,
    canActivate: [RouteGuardService],
    data: {
      users: [ProposalUsers.All]
    }
  },
  {
    path: 'list',
    component: ProposalsComponent,
    canActivate: [RouteGuardService],
    data: {
      users: [ProposalUsers.All]
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/proposals/list'
  }
]

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full'
  },
  {
    path: 'locations',
    component: LocationsComponent,
    data: {
      title: 'Locations',
    }
  },
  {
    path: 'milestones',
    component: MilestonesComponent,
    data: {
      title: 'Milestones',
    }
  }
]

export const childRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Dashboard',
      class: 'glyphicon-stats',
      menu: true,
      users: [ProposalUsers.All]
    }
  },
  {
    path: 'new',
    canActivate: [RouteGuardService],
    //component: NewComponent,
    children: newProposalRoutes,
    data: {
      title: 'New Proposal',
      class: 'glyphicon-copy',
      menu: true,
      users: [ProposalUsers.SalesLead]
    }
  },
  {
    path: 'proposals',
    canActivate: [RouteGuardService],
    data: {
      title: 'Proposals',
      class: 'glyphicon-list-alt',
      menu: true,
      users: [ProposalUsers.All]
    },
    children: viewProposalRoutes
  },
  //{
  //  path: 'proposals',
  //  component: ProposalsComponent,
  //  canActivate: [RouteGuardService],
  //  data: {
  //    title: 'Proposals',
  //    class: 'glyphicon-list-alt',
  //    menu: true,
  //    users: [ProposalUsers.All]
  //  },
  //  children: viewProposalRoutes
  //},
  //{
  //  path: 'newProposal',
  //  component: NewProposalComponent,
  //  canActivate: [RouteGuardService],
  //  data: {
  //    title: 'New Proposal',
  //    class: 'glyphicon-copy',
  //    menu: true,
  //    users: [ProposalUsers.SalesLead]
  //  }
  //},
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Administration',
      class: 'glyphicon-wrench',
      menu: true,
      users: [ProposalUsers.SalesLead]
    },
    children: adminRoutes
  },
  {
    path: 'viewProposal/:RFPCode',
    component: ViewProposalComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'View Proposal',
      class: 'glyphicon-copy',
      menu: false,
      users: [ProposalUsers.All]
    }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    //canActivate: [RouteGuardService],
    data: {
      title: '',
      class: '',
      menu: false,
      users: [ProposalUsers.All]
    }
  }
];


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    //canActivate: [RouteGuardService],
    children: childRoutes,
    data: {
      title: '',
      class: '',
      menu: false,
      users: [ProposalUsers.All]
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/dashboard'
  },
  {
    path: '**',
    redirectTo: '/app/dashboard'
  }
];
