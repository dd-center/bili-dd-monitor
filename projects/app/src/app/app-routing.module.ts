import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLivingComponent } from './app-living/app-living.component';
import { AppFollowComponent } from './app-follow/app-follow.component';
import { AppVtbsComponent } from './app-vtbs/app-vtbs.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';

const routes: Routes = [
  { path: '', redirectTo: '/living', pathMatch: 'full' },
  { path: 'living', component: AppLivingComponent },
  { path: 'follow', component: AppFollowComponent },
  { path: 'vtbs', component: AppVtbsComponent },
  { path: 'ddc-app', component: AppDdcAppComponent },
  { path: 'setting', component: AppSettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
