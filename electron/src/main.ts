import { app, BrowserWindow, ipcMain } from 'electron';
import { VtbInfoService, getFollowLists, addFollowList, deleteFollowList, renameFollowList, initFollowList, follow, setFollowList } from './services';
import * as setting from 'electron-settings'
import { FollowList, VtbInfo } from '../../interfaces';
const createMainWindow = (): BrowserWindow => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        resizable: false,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        icon: 'dist/public/icon.ico',
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

    initFollowList();
    win.webContents.on('did-finish-load', () => {
        let lastLiveVtbs: number[] = [];
        vtbInfosService.onUpdate((vtbInfos) => {
            const followVtbs = getFollowLists().map((followList: FollowList) => ([...followList.mids]))[0];
            let nowLiveFollowedVtbs = vtbInfos.filter((vtbInfo: VtbInfo) => (followVtbs.includes(vtbInfo.mid) && vtbInfo.liveStatus)).map((vtbInfo: VtbInfo) => vtbInfo.mid);
            const upLiveFollowedVtb = [];
            const downLiveFollowedVtb = [];

            // win.webContents.send('liveNotice', vtbInfos[0],"上播提醒：下播提醒") //
        })
    })
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
    ipcMain.on('follow', (event: Electron.IpcMainEvent, mid: number) => {
        follow(mid);
        event.returnValue = getFollowLists();;
    });
    ipcMain.on('setFollowList', (event: Electron.IpcMainEvent, mids: number[], listId: number) => {
        setFollowList(mids, listId)
        event.returnValue = getFollowLists();;
    });
})();




