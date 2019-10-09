import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {VtbInfo} from '../../../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private electron:ElectronService) { 
    electron.ipcRenderer.on('liveNotice',(event:Electron.IpcRendererEvent,vtbInfo:VtbInfo)=>{
      const notification = new Notification(vtbInfo.uname,{
        body:vtbInfo.title,
        icon:vtbInfo.face,
        image:vtbInfo.topPhoto,
        actions:[],
      })
      setTimeout(()=>{
        notification.close()
      },5000);
      notification.onclick = ()=>{

      }
    })
  }
}
