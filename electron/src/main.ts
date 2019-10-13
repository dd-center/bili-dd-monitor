import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import * as request from 'request';
import * as fs from 'fs';
import { join } from 'path';
import { VtbInfoService, FollowListService } from './services';
import { FollowList, VtbInfo } from '../../interfaces';
import { PlayerObj } from '../../interfaces';
import { createMainWinMenu } from './mainWinMenu';
const tempPath = app.getPath('temp');

let playerObjMap = new Map<number, PlayerObj>();
let win: BrowserWindow = null;
let vtbInfosService: VtbInfoService;
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
});
const createMainWindow = (): BrowserWindow => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        useContentSize: true,
        icon: 'public/icon.ico',
        title: 'DD监控室',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.webContents.on('did-finish-load', () => {
        win.setResizable(false);
    })
    // win.loadURL('http://localhost:4200');
    // win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/../../app/index.html`);
    win.setMenu(createMainWinMenu(app, playerObjMap));
    win.on('close', () => {
        playerObjMap.forEach((playerObj: PlayerObj) => {
            playerObj.playerWin.close();
        })
        playerObjMap.clear();
        app.quit();
    });
    return win;
}
const createPlayer = (cid: number): PlayerObj => {
    const win = new BrowserWindow({
        width: 640,
        height: 360,
        enableLargerThanScreen: true,
        useContentSize: true,
        icon: 'public/icon.ico',
        title: vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).title,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (fs.existsSync(join(tempPath, `./faces/${cid}.jpg`))) {
        win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${cid}.jpg`)));
    } else {
        if (fs.existsSync(join(tempPath, './faces'))) {
            request(vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).face).pipe(fs.createWriteStream(join(tempPath, `./faces/${cid}.jpg`))).on('close', () => {
                win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${cid}.jpg`)));
            })
        } else {
            fs.mkdir(join(tempPath, './faces'), () => {
                request(vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).face).pipe(fs.createWriteStream(join(tempPath, `./faces/${cid}.jpg`))).on('close', () => {
                    win.setIcon(nativeImage.createFromPath(join(tempPath, `./faces/${cid}.jpg`)));
                })
            })
        }
    }

    win.on('page-title-updated', (event: Electron.Event) => {
        event.preventDefault();
    })
    win.loadURL(`https://www.bilibili.com/blackboard/live/live-activity-player.html?enterTheRoom=0&cid=${cid}`).then(() => {
        win.webContents.insertCSS('.bilibili-live-player-video-logo{display:none}')
    });
    win.setMenu(null);
    win.on('close', () => {
        if (playerObjMap.get(cid)) {
            if (playerObjMap.get(cid).danmakuWin) {
                playerObjMap.get(cid).danmakuWin.close();
            }
        }
        playerObjMap.delete(cid);
    });
    return {
        cid,
        playerWin: win,
        danmakuWin: null
    }
}
(async () => {
    vtbInfosService = await vtbInfosInit;
    win = await mainWindowInit;
    FollowListService.initFollowList();
    let lastLiveVtbs: number[] = [];
    vtbInfosService.onUpdate((vtbInfos) => {
        const followVtbs = FollowListService.getFollowLists().map((followList: FollowList) => ([...followList.mids]))[0];
        let nowLiveFollowedVtbs = vtbInfos.filter((vtbInfo: VtbInfo) => (followVtbs.includes(vtbInfo.mid) && vtbInfo.liveStatus)).map((vtbInfo: VtbInfo) => vtbInfo.mid);
        let upLiveFollowedVtbs: number[] = [];
        let downLiveFollowedVtbs: number[] = [];
        nowLiveFollowedVtbs.forEach(nowLiveFollowedVtb => {
            if (!lastLiveVtbs.includes(nowLiveFollowedVtb)) {
                upLiveFollowedVtbs.push(nowLiveFollowedVtb)
            }
        });
        lastLiveVtbs.forEach(lastLiveVtb => {
            if (!nowLiveFollowedVtbs.includes(lastLiveVtb)) {
                downLiveFollowedVtbs.push(lastLiveVtb);
            }
        })
        upLiveFollowedVtbs.forEach((mid: number) => {
            win.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "上播提醒")
        })
        downLiveFollowedVtbs.forEach((mid: number) => {
            win.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "下播提醒")
        })
        lastLiveVtbs = nowLiveFollowedVtbs;
    })
    ipcMain.on('showPlayer', (event: Electron.IpcMainEvent, cid: number) => {
        if (playerObjMap.has(cid)) {
            playerObjMap.get(cid).playerWin.focus();
        } else {
            playerObjMap.set(cid, createPlayer(cid));
        }
    })
    ipcMain.on('getVtbInfos', (event: Electron.IpcMainEvent) => {
        event.reply('getVtbInfosReply', vtbInfosService.getVtbInfos());
    });
    ipcMain.on('getFollowedVtbInfos', (event: Electron.IpcMainEvent) => {
        event.reply('getFollowedVtbInfosReply', vtbInfosService.getFollowedVtbInfos());
    });
    ipcMain.on('getFollowedVtbMids', (event: Electron.IpcMainEvent) => {
        event.reply('getFollowedVtbMidsReply', vtbInfosService.getFollowedVtbMids());
    });
    ipcMain.on('getFollowLists', (event: Electron.IpcMainEvent) => {
        event.reply('getFollowListsReply', FollowListService.getFollowLists());
    });
    ipcMain.on('addFollowList', (event: Electron.IpcMainEvent, name: string) => {
        FollowListService.addFollowList(name);
        event.reply('addFollowListReply', FollowListService.getFollowLists());;
    });
    ipcMain.on('deleteFollowList', (event: Electron.IpcMainEvent, id: number) => {
        FollowListService.deleteFollowList(id);
        event.reply('deleteFollowListReply', FollowListService.getFollowLists());;
    });
    ipcMain.on('renameFollowList', (event: Electron.IpcMainEvent, id: number, name: string) => {
        FollowListService.renameFollowList(id, name);
        event.reply('renameFollowListReply', FollowListService.getFollowLists());;
    });
    ipcMain.on('follow', (event: Electron.IpcMainEvent, mid: number) => {
        FollowListService.follow(mid);
        event.reply('followReply', vtbInfosService.getFollowedVtbMids());;
    });
    ipcMain.on('setFollowList', (event: Electron.IpcMainEvent, mids: number[], listId: number) => {
        FollowListService.setFollowList(mids, listId)
        event.reply('setFollowListReply', FollowListService.getFollowLists());;
    });
})();




