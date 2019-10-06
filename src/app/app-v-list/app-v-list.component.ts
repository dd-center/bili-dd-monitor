import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/core';
import { VlistService } from '../vlist.service';
import { VTB } from '../vtb';

@Component({
  selector: 'app-app-v-list',
  templateUrl: './app-v-list.component.html',
  styleUrls: ['./app-v-list.component.css']
})
export class AppVListComponent implements OnInit {
  vtbs: VTB[];
  loading: boolean;
  constructor(private vList: VlistService) {
    this.loading = true;
    vList.getVList().subscribe(vtbs => {
      this.vtbs = vtbs;
      this.loading = false;
    });
  }
  ngOnInit() {
  }
  filter(value: string) {
    this.vList.getVList().subscribe(vtbs => {
      this.vtbs = vtbs.filter(vtb => vtb.uname.includes(value));
      this.loading = false;
    });
  }


}
