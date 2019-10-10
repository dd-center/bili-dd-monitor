import { Component, OnInit, ApplicationRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowList, VtbInfo } from '../../../../../../../interfaces';
import { FollowListService } from '../../../services/follow-list.service';
import { VtbInfoService } from '../../../services/vtb-info.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AppFollowComponent } from '../app-follow.component';
@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent implements OnInit {
  public isSetListModalVisible = false;
  public selectVtbInfo: VtbInfo;
  public selectedValue;
  public isSetListModalOkLoading = false;

  private listId: number;
  public followList: FollowList;
  public followedVtbInfos: VtbInfo[] = [];
  public followLists: FollowList[] = [];
  constructor(private routeInfo: ActivatedRoute, private followListService: FollowListService, private vtbInfoService: VtbInfoService, private message: NzMessageService, private followComponent: AppFollowComponent, private zone: NgZone) { }
  loadData() {
    this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
      if (this.listId == -1) {
        let followListTemp = { id: -1, name: '全部关注', mids: [] };
        this.followLists = followLists;
        followLists.forEach((followList: FollowList) => {
          followListTemp.mids = [...followListTemp.mids, ...followList.mids];
        })
        this.followList = followListTemp;
      } else {
        this.followLists = followLists;
        followLists.forEach((followList: FollowList) => {
          if (followList.id == this.listId) {
            this.followList = followList;
          }
        })
      }
      this.vtbInfoService.getFollowedVtbInfos().subscribe((followedVtbInfos: VtbInfo[]) => {
        this.followedVtbInfos = followedVtbInfos;
        this.zone.run(() => { })
      })
    })
  }
  ngOnInit() {
    this.routeInfo.params.subscribe(params => {
      this.listId = params.id;
      this.loadData();
    })
  }
  handleSetListModalShow(mid: number) {
    this.loadData();
    this.followedVtbInfos.find((vtbInfo: VtbInfo) => {
      if (vtbInfo.mid == mid) {
        this.selectVtbInfo = vtbInfo
      }
    })

    this.isSetListModalVisible = true;
  }
  handleSetListModalCancel() {
    this.selectVtbInfo = null;
    this.isSetListModalVisible = false;
  }
  handleSetListModalOk() {
    if (this.selectedValue != null) {
      this.isSetListModalOkLoading = true;
      this.followListService.setFollowList([this.selectVtbInfo.mid], this.selectedValue).subscribe(() => {
        this.loadData();
        this.isSetListModalOkLoading = false;
        this.isSetListModalVisible = false;
        this.message.success('设置成功');
        this.followComponent.loadData();
        this.zone.run(() => { })
      })
    } else {
      this.message.warning('请选择分组');
    }
  }
  onFollow(mid: number) {
    this.followListService.follow(mid).subscribe(() => {
      this.loadData();
    })
    this.followComponent.loadData();
  }

}
