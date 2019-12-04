import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './core/AngularMaterialModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { NewProposalComponent } from './proposals/new-proposal/new-proposal.component';
import { ViewProposalComponent } from './proposals/view-proposal/view-proposal.component';
import { LoaderComponent } from './loader/loader.component';

import { HttpService } from './services/http.service';
import { ProposalService } from './proposals/proposal.service';
import { LoginService } from './login/login.service';
import { LoaderService } from './loader/loader.service';
import { DashboardService } from './dashboard/dashboard.service';
import { SessionService } from './global/session.service';

import { LoaderInterceptor } from './loader/loaderIntercepter';
import { AdministrationComponent } from './administration/administration.component';
import { PlannerProposalComponent } from './proposals/planner-proposal/planner-proposal.component';
import { PlannerNameComponent } from './proposals/planner-name/planner-name.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlannerViewComponent } from './proposals/planner-view/planner-view.component';
import { LocationsComponent } from './administration/locations/locations.component';
import { MilestonesComponent } from './administration/milestones/milestones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    AppLayoutComponent,
    MasterComponent,
    DashboardComponent,
    ProposalsComponent,
    NewProposalComponent,
    ViewProposalComponent,
    LoaderComponent,
    AdministrationComponent,
    PlannerProposalComponent,
    PlannerNameComponent,
    UnauthorizedComponent,
    PlannerViewComponent,
    LocationsComponent,
    MilestonesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [HttpService, ProposalService, LoginService, LoaderService, DashboardService, SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
