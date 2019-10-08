import { Component, OnInit } from '@angular/core';
import { VtbInfoService } from '../vtb-info.service';
import { VtbInfo } from '../../../../../interfaces';
import { FollowService } from '../follow.service';
@Component({
  selector: 'app-app-vtbs',
  templateUrl: './app-vtbs.component.html',
  styleUrls: ['./app-vtbs.component.css']
})
export class AppVtbsComponent implements OnInit {
  vtbInfos: VtbInfo[] = [];
  follows:number[] = [];
  constructor(private vtbInfoService: VtbInfoService,private followService:FollowService) {
  }

  ngOnInit() {
    this.followService.getFollows().subscribe((follows:number[])=>{
      this.follows = follows;
    })
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.sort((vtbInfoA,vtbInfoB)=>vtbInfoB.online-vtbInfoA.online);
    })
  }
  filter(value){
    this.vtbInfoService.getVtbInfos().subscribe((vtbInfos: VtbInfo[]) => {
      this.vtbInfos = vtbInfos.filter((vtbInfo:VtbInfo)=>vtbInfo.uname.includes(value));
    })
  }
  follow(mid:number){
    this.followService.setFollow(mid).subscribe((follows:number[])=>{
      this.follows = follows;
    })
  }

}
