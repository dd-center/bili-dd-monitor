import { Component, OnInit } from '@angular/core';
import { VtbInfoService } from '../../vtb-info.service';
import { VtbInfo } from '../../../../../../interfaces';
@Component({
  selector: 'app-app-vtbs',
  templateUrl: './app-vtbs.component.html',
  styleUrls: ['./app-vtbs.component.css']
})
export class AppVtbsComponent implements OnInit {
  vtbInfos: VtbInfo[] = [];
  follows = [];
  constructor(private vtbInfoService: VtbInfoService) {
  }

  ngOnInit() {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.sort((vtbInfoA, vtbInfoB) => vtbInfoB.online - vtbInfoA.online);
    })
  }
  filter(value) {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.filter((vtbInfo: VtbInfo) => vtbInfo.uname.includes(value));
    })
  }

}
