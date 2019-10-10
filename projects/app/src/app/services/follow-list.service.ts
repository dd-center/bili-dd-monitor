import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FollowList } from '../../../../../interfaces';
import { Observable, of, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FollowListService {
  constructor(private electron: ElectronService) {
    
  }
  private sequenceSubscriber = (channel: string) => {
    return ((observer: Observer<FollowList[]>) => {
      switch (channel) {
        case 'getFollowListsReply': {
          this.electron.ipcRenderer.once('getFollowListsReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
          break;
        }
        case 'addFollowListReply': {
          this.electron.ipcRenderer.once('addFollowListReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
        }
          break;
        case 'deleteFollowListReply': {
          this.electron.ipcRenderer.once('deleteFollowListReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
        }
          break;
        case 'renameFollowListReply': {
          this.electron.ipcRenderer.once('renameFollowListReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
        }
          break;
        case 'followReply': {
          this.electron.ipcRenderer.once('followReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
        }
          break;
        case 'setFollowListReply': {
          this.electron.ipcRenderer.once('setFollowListReply', (e: Electron.IpcRendererEvent, followLists: FollowList[]) => {
            observer.next(followLists);
            observer.complete();
          })
        }
          break;
      }
    })
  }
  getFollowLists(): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('getFollowLists');
    return new Observable<FollowList[]>(this.sequenceSubscriber('getFollowListsReply'));
  }
  addFollowList(name: string): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('addFollowList', name);
    return new Observable<FollowList[]>(this.sequenceSubscriber('addFollowListReply')); 
  }
  deleteFollowList(id: number): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('deleteFollowList', id)
    return new Observable<FollowList[]>(this.sequenceSubscriber('deleteFollowListReply'));
  }
  renameFollowList(id: number, name: string): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('renameFollowList', id, name)
    return new Observable<FollowList[]>(this.sequenceSubscriber('renameFollowListReply'));
  }
  follow(mid: number): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('follow', mid)
    return new Observable<FollowList[]>(this.sequenceSubscriber('followReply'));
  }
  setFollowList(mids: number[], listId: number): Observable<FollowList[]> {
    this.electron.ipcRenderer.send('setFollowList', mids, listId)
    return new Observable<FollowList[]>(this.sequenceSubscriber('setFollowListReply'));
  }

}
