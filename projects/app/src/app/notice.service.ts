import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { VtbInfo } from '../../../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private electron: ElectronService) {
    console.log('init')
    electron.ipcRenderer.on('liveNotice', (event: Electron.IpcRendererEvent, vtbInfo: VtbInfo) => {
      console.log(123)
      const notification = new Notification(vtbInfo.uname, {
        body: vtbInfo.title,
        icon: vtbInfo.face,
        image: vtbInfo.topPhoto,
        actions: [],
      })
      notification.onclick = () => {

      }
    })
  }
}
