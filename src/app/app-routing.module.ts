import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLivingComponent } from './app-living/app-living.component';
import { AppVListComponent } from './app-v-list/app-v-list.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
import { combineLatest } from 'rxjs';
import { AppFollowComponent } from './app-follow/app-follow.component';


const routes: Routes = [
  { path: '', redirectTo: 'living', pathMatch: 'full' },
  { path: 'living', component: AppLivingComponent },
  { path: 'v-list', component: AppVListComponent },
  { path: 'ddc-app', component: AppDdcAppComponent },
  { path: 'setting', component: AppSettingComponent },
  { path: 'follow', component: AppFollowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
