import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';
@Component({
  selector: 'app-app-follow',
  templateUrl: './app-follow.component.html',
  styleUrls: ['./app-follow.component.css']
})
export class AppFollowComponent implements OnInit {
  follows:number[] = [];
  constructor(private followService:FollowService) {}

  ngOnInit() {
    this.followService.getFollows().subscribe((follows:number[])=>{
      this.follows = follows;
    })
  }

}
