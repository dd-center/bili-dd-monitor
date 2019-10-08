import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private electron:ElectronService) { }
  setFollow(mid:number):Observable<number[]>{
    return of(this.electron.ipcRenderer.sendSync('setFollow',mid));
  }
  getFollows():Observable<number[]>{
    return of(this.electron.ipcRenderer.sendSync('getFollows'));
  }

}
