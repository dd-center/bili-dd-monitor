import { app, BrowserWindow, ipcMain } from 'electron';
import { VtbInfoService, getFollows, setFollow, initFollows} from './services';
import * as setting from 'electron-settings'

import { async } from 'q';
const createMainWindow = (): BrowserWindow => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        resizable: false,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        title: 'DD监控室',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadURL('http://localhost:4200');
    win.on('close', () => {
        app.quit();
    });
    return win;
}
const createPlayerWinodw = (): BrowserWindow => {
    return null;
}
const mainWindowInit = new Promise<BrowserWindow>((resolve) => {
    app.on('ready', () => {
        resolve(createMainWindow());
    });
});
const vtbInfosInit = new Promise<VtbInfoService>((resolve) => {
    const vtbInfosService = new VtbInfoService();
    setInterval(() => {
        if (vtbInfosService.getVtbInfos().length > 0) {
            resolve(vtbInfosService);
        }
    }, 50);
})
const settingInit = async()=>{
    initFollows();
}
const test = async()=>{
}
let win: BrowserWindow = null;
let vtbInfosService: VtbInfoService;
(async () => {
    await settingInit();
    vtbInfosService = await vtbInfosInit;
    win = await mainWindowInit;

    ipcMain.on('vtbInfos', (event: Electron.IpcMainEvent) => {
        event.returnValue = vtbInfosService.getVtbInfos();
    });
    ipcMain.on('setFollow',(event:Electron.IpcMainEvent,value:number)=>{
        setFollow(value);
        event.returnValue = getFollows();
    })
    ipcMain.on('getFollows',(event:Electron.IpcMainEvent)=>{
        event.returnValue = getFollows();
    })
})();




