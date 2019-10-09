import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FollowList,VtbInfo} from '../../../../../../../interfaces';
import { FollowListService } from '../../../follow-list.service';
import { VtbInfoService } from '../../../vtb-info.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AppFollowComponent } from '../app-follow.component';
@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent implements OnInit {
  private isSetListModalVisible = false;
  private selectVtbInfo:VtbInfo; 
  private selectedValue;
  private isSetListModalOkLoading = false;

  private listId: number;
  private followList: FollowList;
  private vtbInfos:VtbInfo[] = [];
  private followLists:FollowList[] = [];
  constructor(private routeInfo: ActivatedRoute,private followListService:FollowListService,private vtbInfoService:VtbInfoService,private message: NzMessageService,private followComponent: AppFollowComponent) { }
  loadData(){
    if(this.listId==-1){
      this.followListService.getFollowLists().subscribe((followLists:FollowList[])=>{
        let followListTemp = {id:-1,name:'全部关注',mids:[]};
        this.followLists = followLists;
        followLists.forEach((followList:FollowList)=>{
          followListTemp.mids = [...followListTemp.mids,...followList.mids];
        })
        this.followList = followListTemp;
      })

    }else{
      this.followListService.getFollowLists().subscribe((followLists:FollowList[])=>{
        this.followLists = followLists;
        followLists.forEach((followList:FollowList)=>{
          if(followList.id==this.listId){
            this.followList = followList;
          }
        })
      })
    }
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos:VtbInfo[])=>{
      this.vtbInfos=vtbInfos.filter((vtbInfo:VtbInfo)=>this.followList.mids.includes(vtbInfo.mid))
    })
  }
  ngOnInit() {
    this.routeInfo.params.subscribe(params => {
      this.listId = params.id;
      this.loadData();
    })
  }
  handleSetListModalShow(mid:number){
    this.loadData();
      this.vtbInfos.find((vtbInfo:VtbInfo)=>{
        if(vtbInfo.mid==mid){
          this.selectVtbInfo = vtbInfo
        }
      })
    
    this.isSetListModalVisible = true;
  }
  handleSetListModalCancel(){
    this.selectVtbInfo = null;
    this.isSetListModalVisible = false;
  }
  handleSetListModalOk(){
    if(this.selectedValue!=null){
      this.isSetListModalOkLoading = true;
      this.followListService.setFollowList([this.selectVtbInfo.mid],this.selectedValue).subscribe(()=>{
        this.loadData();
        this.isSetListModalOkLoading = false;
        this.isSetListModalVisible = false;
        this.message.success('设置成功');
        this.followComponent.loadData();
      })
    }else{
      this.message.warning('请选择分组');
    }
  }
  onFollow(mid:number){
    this.followListService.follow(mid).subscribe(()=>{
      this.loadData();
    })
    this.followComponent.loadData();
  }

}
