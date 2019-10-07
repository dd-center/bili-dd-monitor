import { app, BrowserWindow, ipcMain } from 'electron';
import { VtbInfoService } from './services';
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
let win: BrowserWindow = null;
let vtbInfosService: VtbInfoService;
(async () => {
    vtbInfosService = await vtbInfosInit;
    win = await mainWindowInit;

    ipcMain.on('vtbInfos', (event: Electron.IpcMainEvent) => {
        event.returnValue = vtbInfosService.getVtbInfos();
    });
})();




