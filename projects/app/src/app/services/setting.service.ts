import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private electron: ElectronService) {

  }
  private sequenceSubscriber = (channel: string) => {
    return ((observer: Observer<any>) => {
      switch (channel) {
        case 'setIsNotifiedOnStartReply': {
          this.electron.ipcRenderer.once('setIsNotifiedOnStartReply', (e: Electron.IpcRendererEvent, isNotifiedOnStart: boolean) => {
            observer.next(isNotifiedOnStart);
            observer.complete();
          })
          break;
        }
        case 'getIsNotifiedOnStartReply': {
          this.electron.ipcRenderer.once('getIsNotifiedOnStartReply', (e: Electron.IpcRendererEvent, isNotifiedOnStart: boolean) => {
            observer.next(isNotifiedOnStart);
            observer.complete();
          })
          break;
        }
      }
    })
  }
  setIsNotifiedOnStart(isNotifiedOnStart: boolean): Observable<boolean> {
    this.electron.ipcRenderer.send('setIsNotifiedOnStart', isNotifiedOnStart);
    return new Observable<boolean>(this.sequenceSubscriber('setIsNotifiedOnStartReply'));
  }
  getIsNotifiedOnstart(): Observable<boolean> {
    this.electron.ipcRenderer.send('getIsNotifiedOnStart');
    return new Observable<boolean>(this.sequenceSubscriber('getIsNotifiedOnStartReply'));
  }
}
