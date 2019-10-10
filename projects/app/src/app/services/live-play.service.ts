import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class LivePlayService {

  constructor(private electron: ElectronService) { }
  enterRoom(cid: number) {
    this.electron.ipcRenderer.send('showPlayer', cid);
  }
}
