import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FollowListService } from '../../services/follow-list.service';
import { VtbInfoService } from '../../services/vtb-info.service';
import { VtbInfo, FollowList } from '../../../../../../interfaces';
import { LivePlayService } from '../../services/live-play.service';

@Component({
  selector: 'app-app-living',
  templateUrl: './app-living.component.html',
  styleUrls: ['./app-living.component.css']
})
export class AppLivingComponent implements OnInit {
  public followedVtbInfos: VtbInfo[] = [];
  private timer: any;
  constructor(private followListService: FollowListService, private vtbInfoService: VtbInfoService, private livePlayerService: LivePlayService, private zone: NgZone) {

  }
  loadData = () => {
    this.vtbInfoService.getFollowedVtbInfos().subscribe((followedVtbInfos: VtbInfo[]) => {
      this.followedVtbInfos = followedVtbInfos;
      this.zone.run(() => {

      })
    })
  }
  ngOnInit() {
    this.loadData();
    this.vtbInfoService.updateVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.followedVtbInfos = vtbInfos;
      this.zone.run(() => {

      })
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  enterRoom(cid: number) {
    this.livePlayerService.enterRoom(cid);
  }
}
