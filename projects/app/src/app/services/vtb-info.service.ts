import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { VtbInfo } from '../../../../../interfaces';
import { Observable, of, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VtbInfoService {
  constructor(private electron: ElectronService) {
  }
  private sequenceSubscriber = (channel: string) => {
    return (observer: Observer<any>) => {
      switch (channel) {
        case 'getVtbInfos': {
          this.electron.ipcRenderer.once('getVtbInfosReply', (e: Electron.IpcRendererEvent, vtbInfos: VtbInfo[]) => {
            observer.next(vtbInfos);
            observer.complete();
          })
          break;
        }
        case 'getFollowedVtbInfos': {
          this.electron.ipcRenderer.once('getFollowedVtbInfosReply', (e: Electron.IpcRendererEvent, vtbInfos: VtbInfo[]) => {
            observer.next(vtbInfos);
            observer.complete();
          })
          break;
        }
        case 'getFollowedVtbMids': {
          this.electron.ipcRenderer.once('getFollowedVtbMidsReply', (e: Electron.IpcRendererEvent, vtbInfos: VtbInfo[]) => {
            observer.next(vtbInfos);
            observer.complete();
          })
          break;
        }
        case 'updateVtbInfos': {
          this.electron.ipcRenderer.on('updateVtbInfos', ((event: Electron.Event, vtbInfos: VtbInfo[]) => {
            observer.next(vtbInfos);
          }))
        }
      }
    }
  }
  updateVtbInfos(): Observable<VtbInfo[]> {
    return new Observable(this.sequenceSubscriber('updateVtbInfos'));
  }
  getVtbInfos(): Observable<VtbInfo[]> {
    this.electron.ipcRenderer.send('getVtbInfos');
    return new Observable(this.sequenceSubscriber('getVtbInfos'));
  }
  getFollowedVtbInfos(): Observable<VtbInfo[]> {
    this.electron.ipcRenderer.send('getFollowedVtbInfos');
    return new Observable(this.sequenceSubscriber('getFollowedVtbInfos'));
  }
  getFollowedVtbMids(): Observable<number[]> {
    this.electron.ipcRenderer.send('getFollowedVtbMids');
    return new Observable(this.sequenceSubscriber('getFollowedVtbMids'));
  }
}
