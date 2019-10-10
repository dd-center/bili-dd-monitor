import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { VtbInfoService } from '../../services/vtb-info.service';
import { VtbInfo } from '../../../../../../interfaces';
import { FollowListService } from '../../services/follow-list.service';
import { FollowList } from '../../../../../../interfaces';
@Component({
  selector: 'app-app-vtbs',
  templateUrl: './app-vtbs.component.html',
  styleUrls: ['./app-vtbs.component.css']
})
export class AppVtbsComponent implements OnInit {
  public vtbInfos: VtbInfo[] = [];
  public followedVtbMids: number[] = [];
  constructor(private vtbInfoService: VtbInfoService, private followListService: FollowListService, private zone: NgZone) {

  }
  ngOnInit() {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos;
      this.vtbInfoService.getFollowedVtbMids().subscribe((followedVtbMids: number[]) => {
        this.followedVtbMids = followedVtbMids;
      })
      this.zone.run(() => { });
    })
  }
  filter(value) {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.filter((vtbInfo: VtbInfo) => vtbInfo.uname.includes(value));
      this.zone.run(() => { });
    })
  }
  onFollow(mid) {
    this.followListService.follow(mid).subscribe((followedVtbMids: number[]) => {
      this.followedVtbMids = followedVtbMids;
      this.zone.run(() => { });
    })
  }
}
