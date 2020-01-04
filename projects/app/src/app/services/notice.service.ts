import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { VtbInfo } from '../../../../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private electron: ElectronService) {
    electron.ipcRenderer.on('liveNotice', (event: Electron.IpcRendererEvent, vtbInfo: VtbInfo, extra: string) => {
      const notification = new Notification(extra + " " + vtbInfo.uname, {
        body: vtbInfo.title,
        icon: vtbInfo.face,
        image: vtbInfo.topPhoto,
        actions: [],
      })
      notification.onclick = () => {
        this.electron.ipcRenderer.send('showPlayer', vtbInfo.roomid);
      }
    })
  }
}
