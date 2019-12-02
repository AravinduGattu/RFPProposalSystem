import { Routes, Route } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { ProposalsComponent } from '../proposals/proposals.component';
import { NewProposalComponent } from '../proposals/new-proposal/new-proposal.component';
import { ViewProposalComponent } from '../proposals/view-proposal/view-proposal.component';
import { AdministrationComponent } from '../administration/administration.component';
import { PlannerProposalComponent } from '../proposals/planner-proposal/planner-proposal.component';
import { PlannerNameComponent } from '../proposals/planner-name/planner-name.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { RouteGuardService } from './route-guard.service';
import { Roles } from '../global/constants';
import { ProposalUsers } from '../global/enum';

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
    path: 'proposals',
    component: ProposalsComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Proposals',
      class: 'glyphicon-list-alt',
      menu: true,
      users: [ProposalUsers.All]
    }
  },
  {
    path: 'newProposal',
    component: NewProposalComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'New Proposal',
      class: 'glyphicon-copy',
      menu: true,
      users: [ProposalUsers.SalesLead]
    }
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [RouteGuardService],
    data: {
      title: 'Administration',
      class: 'glyphicon-wrench',
      menu: true,
      users: [ProposalUsers.SalesLead]
    }
  },
  {
    path: 'plannerProposal',
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
