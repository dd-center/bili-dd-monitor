import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { AppLivingComponent } from './app-living/app-living.component';
import { AppVListComponent } from './app-v-list/app-v-list.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
import { AppFollowComponent } from './app-follow/app-follow.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AppLivingComponent,
    AppVListComponent,
    AppDdcAppComponent,
    AppSettingComponent,
    AppFollowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzGridModule,
    NzTreeModule,
    NzListModule,
    NzPaginationModule,
    NzInputModule,
    NzAvatarModule,
    NzPopoverModule

  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
