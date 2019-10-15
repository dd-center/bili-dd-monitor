import { BrowserWindow, nativeImage } from 'electron';
import { PlayerObj } from '../../interfaces';
import * as request from 'request';
import * as fs from 'fs';
import { join } from 'path';
import { VtbInfoService } from './services';
import { VtbInfo } from '../../interfaces';

export const createPlayerWin = (app: Electron.App, playerInfo: VtbInfo, playerObjMap: Map<number, PlayerObj>, vtbInfosService: VtbInfoService): PlayerObj => {
    const tempPath = app.getPath('temp');
    const win = new BrowserWindow({
        width: 640,
        height: 360,
        enableLargerThanScreen: true,
        useContentSize: true,
        icon: 'public/icon.ico',
        title: playerInfo.title,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (fs.existsSync(join(tempPath, `./faces/${playerInfo.roomid}.jpg`))) {
        win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${playerInfo.roomid}.jpg`)));
    } else {
        if (fs.existsSync(join(tempPath, './faces'))) {
            request(playerInfo.face).pipe(fs.createWriteStream(join(tempPath, `./faces/${playerInfo.roomid}.jpg`))).on('close', () => {
                win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${playerInfo.roomid}.jpg`)));
            })
        } else {
            fs.mkdir(join(tempPath, './faces'), () => {
                request(playerInfo.face).pipe(fs.createWriteStream(join(tempPath, `./faces/${playerInfo.roomid}.jpg`))).on('close', () => {
                    win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${playerInfo.roomid}.jpg`)));
                })
            })
        }
    }
    win.on('page-title-updated', (event: Electron.Event) => {
        event.preventDefault();
    })
    win.loadURL(`https://www.bilibili.com/blackboard/live/live-activity-player.html?enterTheRoom=0&cid=${playerInfo.roomid}`).then(() => {
        win.webContents.insertCSS('.bilibili-live-player-video-logo{display:none}')
    });
    win.setMenu(null);
    win.on('close', () => {
        if (playerObjMap.get(playerInfo.roomid)) {
            if (playerObjMap.get(playerInfo.roomid).danmakuWin) {
                playerObjMap.get(playerInfo.roomid).danmakuWin.close();
            }
        }
        playerObjMap.delete(playerInfo.roomid);
    });
    return {
        cid: playerInfo.roomid,
        playerWin: win,
        danmakuWin: null
    }
}