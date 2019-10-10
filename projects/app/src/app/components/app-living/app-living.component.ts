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
  public vtbInfos: VtbInfo[] = [];
  private timer: any;

  constructor(private followListService: FollowListService, private vtbInfoService: VtbInfoService,private zone:NgZone) { 
    
  }
  loadData = () => {
    let vtbInfosTemp = [];
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
        followLists.forEach((followList: FollowList) => {
          vtbInfosTemp = [...vtbInfosTemp, ...vtbInfos.filter((vtbInfo: VtbInfo) => followList.mids.includes(vtbInfo.mid))]
        })
        this.vtbInfos = vtbInfosTemp;
      })
    })
  }
  ngOnInit() {
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
        followLists.forEach((followList: FollowList) => {
          this.vtbInfos = [...this.vtbInfos, ...vtbInfos.filter((vtbInfo: VtbInfo) => followList.mids.includes(vtbInfo.mid))]
        })
        this.zone.run(()=>{});
      })
    })
    this.timer = setInterval(this.loadData, 2000)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}
