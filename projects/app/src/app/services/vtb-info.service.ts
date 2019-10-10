import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {VtbInfo} from '../../../../../interfaces';
import { Observable,of, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VtbInfoService {
  constructor(private electron:ElectronService) {
  }
  private sequenceSubscriber = (observer:Observer<VtbInfo[]>)=>{
    this.electron.ipcRenderer.once('vtbInfosReply',(e:Electron.IpcRendererEvent,vtbInfos:VtbInfo[])=>{
      observer.next(vtbInfos);
      observer.complete();
    })
  }
  getVtbInfos():Observable<VtbInfo[]>{
    this.electron.ipcRenderer.send('vtbInfos');
    return new Observable(this.sequenceSubscriber);
  }
}
