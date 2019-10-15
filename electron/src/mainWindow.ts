import { BrowserWindow, Menu } from "electron";
import { createMainWinMenu } from './mainWinMenu';
import { PlayerObj } from "../../interfaces";

export const createMainWin = (app: Electron.App, playerObjMap: Map<number, PlayerObj>): BrowserWindow => {
    const win = new BrowserWindow({
        width: 1250,
        height: 850,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        resizable: false,
        icon: 'public/icon.ico',
        title: 'DD监控室',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // win.loadURL('http://127.0.0.1:4200')
    win.loadURL(`file://${__dirname}/../../app/index.html`);
    // win.webContents.openDevTools();
    const menu = createMainWinMenu(app, playerObjMap);
    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(menu);
    } else {
        win.setMenu(menu);
    }
    win.on('close', () => {
        playerObjMap.forEach((playerObj: PlayerObj) => {
            playerObj.playerWin.close();
        })
        playerObjMap.clear();
        app.quit();
    });
    return win;
}