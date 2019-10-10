import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FollowListService } from '../../services/follow-list.service';
import { VtbInfoService } from '../../services/vtb-info.service';
import { VtbInfo, FollowList } from '../../../../../../interfaces';

@Component({
  selector: 'app-app-living',
  templateUrl: './app-living.component.html',
  styleUrls: ['./app-living.component.css']
})
export class AppLivingComponent implements OnInit {
  public followedVtbInfos: VtbInfo[] = [];
  private timer: any;
  public isLoading = true;
  constructor(private followListService: FollowListService, private vtbInfoService: VtbInfoService, private zone: NgZone) {

  }
  loadData = () => {
    this.vtbInfoService.getFollowedVtbInfos().subscribe((followedVtbInfos: VtbInfo[]) => {
      this.followedVtbInfos = followedVtbInfos;
      this.zone.run(() => {

      })
    })
  }
  ngOnInit() {
    this.vtbInfoService.getFollowedVtbInfos().subscribe((followedVtbInfos: VtbInfo[]) => {
      this.followedVtbInfos = followedVtbInfos;
      this.isLoading = false;
      this.zone.run(() => {

      })
    })
    this.timer = setInterval(this.loadData, 2000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}
