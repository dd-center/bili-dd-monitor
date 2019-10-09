import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FollowList } from '../../../../interfaces';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FollowListService {
  constructor(private electron: ElectronService) { }
  getFollowLists(): Observable<FollowList[]> {
    return of(this.electron.ipcRenderer.sendSync('getFollowLists'));
  }
  addFollowList(name: string): Observable<FollowList[]> {
    return of(this.electron.ipcRenderer.sendSync('addFollowList', name));
  }
  deleteFollowList(id: number): Observable<FollowList[]> {
    return of(this.electron.ipcRenderer.sendSync('deleteFollowList', id));
  }
  renameFollowList(id: number, name: string): Observable<FollowList[]> {
    return of(this.electron.ipcRenderer.sendSync('renameFollowList', id, name));
  }
  follow(mid:number):Observable<FollowList[]>{
    return of(this.electron.ipcRenderer.sendSync('follow', mid));
  }
  setFollowList(mids:number[],listId:number):Observable<FollowList[]>{
    return of(this.electron.ipcRenderer.sendSync('setFollowList', mids,listId));
  }

}
