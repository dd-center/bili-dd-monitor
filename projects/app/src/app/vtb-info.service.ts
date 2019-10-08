import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {VtbInfo} from '../../../../interfaces';
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VtbInfoService {

  constructor(private electron:ElectronService) { }
  getVtbInfos():Observable<VtbInfo[]>{
    return of(this.electron.ipcRenderer.sendSync('vtbInfos'))
  }
}
