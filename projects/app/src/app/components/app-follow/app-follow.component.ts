import { Component, OnInit, NgZone } from '@angular/core';
import { FollowListService } from '../../services/follow-list.service';
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
  renameListName = '';
  renameListId: number;
  isRenameListModalVisible = false;
  isRenameListModalOkLoading = false;
  constructor(private router: Router, private followListService: FollowListService, private message: NzMessageService, private zone: NgZone) { }
  loadData() {
    this.followListService.getFollowLists().subscribe((followLists: FollowList[]) => {
      this.followLists = followLists;
      this.zone.run(() => { })
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
        this.router.navigateByUrl("follow/list/-1");
        this.zone.run(() => { })
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
  handleCreateListModalOk() {
    if (this.followLists.length < 10) {
      if (this.createListModalValue.length <= 10) {
        if (!this.followLists.map((followList: FollowList) => followList.name).includes(this.createListModalValue)) {
          this.isCreateListModalOkLoading = true;
          this.followListService.addFollowList(this.createListModalValue).subscribe((followLists => {
            this.followLists = followLists;
            this.isCreateListModalOkLoading = false;
            this.isCreateListModalVisible = false;
            this.message.success('分组创建成功');
            this.zone.run(() => { })
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
  showRenameListModal(id: number, name: string) {
    this.renameListId = id;
    this.renameListName = name;
    this.isRenameListModalVisible = true;
  }
  handleRenameListModalCancel() {
    this.isRenameListModalVisible = false;
  }
  handleRenameListModalOk() {
    if (this.renameListName.length <= 10) {
      if (!this.followLists.map((followList: FollowList) => followList.name).includes(this.renameListName)) {
        this.isRenameListModalOkLoading = true;
        this.followListService.renameFollowList(this.renameListId, this.renameListName).subscribe((followLists => {
          this.followLists = followLists;
          this.isRenameListModalOkLoading = false;
          this.isRenameListModalVisible = false;
          this.message.success('分组名字修改成功');
          this.zone.run(() => { })
        }))
      } else {
        this.message.error('分组名字重复');
      }
    } else {
      this.message.error('分组名字过长');
    }
  }
}
