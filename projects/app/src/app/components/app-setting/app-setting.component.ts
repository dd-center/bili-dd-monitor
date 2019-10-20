import { Component, OnInit, NgZone } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit {
  isNotifiedOnStart: boolean;
  constructor(private settingService: SettingService, private zone: NgZone) { }

  ngOnInit() {
    this.settingService.getIsNotifiedOnstart().subscribe((isNotifiedOnStart: boolean) => {
      this.isNotifiedOnStart = isNotifiedOnStart;
      this.zone.run(() => { });
    })
  }
  HandleIsNotifiedOnStartChange() {
    this.settingService.setIsNotifiedOnStart(this.isNotifiedOnStart).subscribe((isNotifiedOnStart: boolean) => {
      this.isNotifiedOnStart = isNotifiedOnStart;
    })
  }
}
