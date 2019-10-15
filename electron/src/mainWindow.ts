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
    win.loadURL(`file://${__dirname}/../../app/index.html`);
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