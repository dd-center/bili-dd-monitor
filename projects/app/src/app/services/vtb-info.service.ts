import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {VtbInfo} from '../../../../../interfaces';
import { Observable,of, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VtbInfoService {
  private vtbInfoObservable:Observable<VtbInfo[]>;
  constructor(private electron:ElectronService) {
    const sequenceSubscriber = (observer:Observer<VtbInfo[]>)=>{
      this.electron.ipcRenderer.once('vtbInfosReply',(e:Electron.IpcRendererEvent,vtbInfos:VtbInfo[])=>{
        observer.next(vtbInfos);
        observer.complete();
      })
    }
    this.vtbInfoObservable = new Observable(sequenceSubscriber);
  }
  getVtbInfos():Observable<VtbInfo[]>{
    this.electron.ipcRenderer.send('vtbInfos');
    return this.vtbInfoObservable;
  }
}
