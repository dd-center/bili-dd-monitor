import { Component, OnInit } from '@angular/core';
import { FollowListService } from '../../follow-list.service';
import { FollowList } from '../../../../../../interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-follow',
  templateUrl: './app-follow.component.html',
  styleUrls: ['./app-follow.component.css']
})
export class AppFollowComponent implements OnInit {
  mouseOverListId = -1;

  followLists: FollowList[] = [];

  createListModalValue = '';
  isCreateListModalVisible = false;
  isCreateListModalOkLoading = false;
  constructor(private router:Router,private followListService: FollowListService, private message: NzMessageService) { }
  loadData(){
    this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
      this.followLists = followLists;
    })
  }
  ngOnInit() {
    this.loadData();
  }
  mouseEnter(id: number) {
    this.mouseOverListId = id;
  }
  mouseLeave() {
    setTimeout(() => {
      this.mouseOverListId = -1;
    }, 1000)
  }
  handleDeleteList(id: number) {
    if (this.followLists.map((followList: FollowList) => followList.id).includes(id)) {
      this.followListService.deleteFollowList(id).subscribe((followLists: FollowList[]) => {
        this.followLists = followLists;
        this.message.success('分组删除成功');
        this.router.navigateByUrl("follow/list/-1") 
      })
    }
  }
  showCreateListModal() {
    this.createListModalValue = '';
    this.isCreateListModalVisible = true;
  }
  handleCreateListModalCancel() {
    this.isCreateListModalVisible = false;
  }
  handleCreateListModalOk(value) {
    if (this.followLists.length < 10) {
      if (value.length <= 10) {
        if (!this.followLists.map((followList: FollowList) => followList.name).includes(value)) {
          this.isCreateListModalOkLoading = true;
          this.followListService.addFollowList(value).subscribe((followLists => {
            this.followLists = followLists;
            this.isCreateListModalOkLoading = false;
            this.isCreateListModalVisible = false;
            this.message.success('分组创建成功');
          }))
        } else {
          this.message.error('分组名字重复');
        }
      } else {
        this.message.error('分组名字过长');
      }
    } else {
      this.message.error('最多只能有十个分组');
    }

  }
}
