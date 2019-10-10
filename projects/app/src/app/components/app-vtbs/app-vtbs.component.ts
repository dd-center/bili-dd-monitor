import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public follows = [];
  constructor(private vtbInfoService: VtbInfoService, private followListService: FollowListService) {
 
  }
  ngOnInit() {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.sort((vtbInfoA, vtbInfoB) => vtbInfoB.online - vtbInfoA.online);
    })
    this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
      let follows = [];
      followLists.forEach((followList: FollowList) => {
        follows = [...follows, ...followList.mids];
        this.follows = follows;
      })
    })
  }
  filter(value) {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.filter((vtbInfo: VtbInfo) => vtbInfo.uname.includes(value));
    })
  }
  onFollow(mid) {
    this.followListService.follow(mid).subscribe((followLists: FollowList[]) => {
      let follows = [];
      followLists.forEach((followList: FollowList) => {
        follows = [...follows, ...followList.mids];
        this.follows = follows;
      })
    })
  }

}
