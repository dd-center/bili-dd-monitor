import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLivingComponent } from './components/app-living/app-living.component';
import { AppFollowComponent } from './components/app-follow/app-follow.component';
import { AppVtbsComponent } from './components/app-vtbs/app-vtbs.component';
import { AppDdcAppComponent } from './components/app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './components/app-setting/app-setting.component';
import { FollowListComponent } from './components/app-follow/follow-list/follow-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/living', pathMatch: 'full' },
  { path: 'living', component: AppLivingComponent },
  {
    path: 'follow', component: AppFollowComponent,
    children: [
      { path: '', redirectTo: 'list/-1', pathMatch: 'full' },
      { path: 'list/:id', component: FollowListComponent }]
  },
  { path: 'vtbs', component: AppVtbsComponent },
  { path: 'ddc-app', component: AppDdcAppComponent },
  { path: 'setting', component: AppSettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
