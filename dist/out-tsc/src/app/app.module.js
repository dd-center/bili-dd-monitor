import { __decorate } from "tslib";
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
import { AppLivingComponent } from './app-living/app-living.component';
import { AppVListComponent } from './app-v-list/app-v-list.component';
import { AppDdcAppComponent } from './app-ddc-app/app-ddc-app.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
registerLocaleData(zh);
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            AppLivingComponent,
            AppVListComponent,
            AppDdcAppComponent,
            AppSettingComponent,
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            NgZorroAntdModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
            NzLayoutModule
        ],
        providers: [{ provide: NZ_I18N, useValue: zh_CN }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map