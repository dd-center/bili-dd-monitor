import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLivingComponent } from './app-living/app-living.component';
import { AppVListComponent } from './app-v-list/app-v-list.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';


const routes: Routes = [
  { path: '', redirectTo: 'living', pathMatch: 'full' },
  { path: 'living', component: AppLivingComponent },
  { path: 'v-list', component: AppVListComponent },
  { path: 'ddc-app', component: AppDdcAppComponent },
  { path: 'setting', component: AppSettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
