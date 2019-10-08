import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppLivingComponent } from './app-living/app-living.component';
import { AppFollowComponent } from './app-follow/app-follow.component';
import { AppVtbsComponent } from './app-vtbs/app-vtbs.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
import { NgxElectronModule } from 'ngx-electron'
import { ScrollingModule } from '@angular/cdk/scrolling';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AppLivingComponent,
    AppFollowComponent,
    AppVtbsComponent,
    AppDdcAppComponent,
    AppSettingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    NgxElectronModule,
    ScrollingModule
  ],
  bootstrap: [AppComponent],
  /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class AppModule { }