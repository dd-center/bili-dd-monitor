import { app, BrowserWindow, ipcMain } from 'electron';
import { VtbInfoService, getFollowLists, addFollowList, deleteFollowList, renameFollowList } from './services';
import * as setting from 'electron-settings'
import { FollowList } from '../../interfaces';
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
    win.webContents.openDevTools();
    win.setMenu(null);
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
const test = async () => {
}
let win: BrowserWindow = null;
let vtbInfosService: VtbInfoService;
(async () => {
    vtbInfosService = await vtbInfosInit;
    win = await mainWindowInit;

    if (!setting.has('followLists')) {
        const defaultList: FollowList = { id: 0, name: '默认分组', mids: [] };
        setting.set('followLists', JSON.stringify([defaultList]));
    }
    ipcMain.on('vtbInfos', (event: Electron.IpcMainEvent) => {
        event.returnValue = vtbInfosService.getVtbInfos();
    });
    ipcMain.on('getFollowLists', (event: Electron.IpcMainEvent) => {
        event.returnValue = getFollowLists();
    });
    ipcMain.on('addFollowList', (event: Electron.IpcMainEvent, name: string) => {
        addFollowList(name);
        event.returnValue = getFollowLists();;
    });
    ipcMain.on('deleteFollowList', (event: Electron.IpcMainEvent, id: number) => {
        deleteFollowList(id);
        event.returnValue = getFollowLists();;
    });
    ipcMain.on('renameFollowList', (event: Electron.IpcMainEvent, id: number, name: string) => {
        renameFollowList(id, name);
        event.returnValue = getFollowLists();;
    });


})();




