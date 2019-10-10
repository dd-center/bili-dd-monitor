import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { VtbInfoService, getFollowLists, addFollowList, deleteFollowList, renameFollowList, initFollowList, follow, setFollowList } from './services';
import { FollowList, VtbInfo } from '../../interfaces';
import { PlayerObj } from '../../interfaces';
import * as request from 'request';
import * as fs from 'fs';
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
        resizable: false,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        icon: 'public/icon.ico',
        title: 'DD监控室',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // win.loadURL('http://localhost:4200');
    // win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/../../app/index.html`);
    win.setMenu(null);
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
    // nativeImage.createFromDataURL(vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).face)
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        useContentSize: true,
        icon: 'public/icon.ico',
        title: vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).title,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (fs.existsSync(`./faces/${cid}.jpg`)) {
        win.setIcon(nativeImage.createFromPath(`./faces/${cid}.jpg`));
    } else {
        if (fs.existsSync('./faces')) {
            request(vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).face).pipe(fs.createWriteStream(`./faces/${cid}.jpg`)).on('close', () => {
                win.setIcon(nativeImage.createFromPath(`./faces/${cid}.jpg`));
            })
        } else {
            fs.mkdir('./faces', () => {
                request(vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid === cid).face).pipe(fs.createWriteStream(`./faces/${cid}.jpg`)).on('close', () => {
                    win.setIcon(nativeImage.createFromPath(`./faces/${cid}.jpg`));
                })
            })
        }
    }

    win.on('page-title-updated', (event: Electron.Event) => {
        event.preventDefault();
    })
    win.loadURL(`https://www.bilibili.com/blackboard/live/live-activity-player.html?enterTheRoom=0&cid=${cid}`);
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
    initFollowList();
    win.webContents.on('did-finish-load', () => {
        let lastLiveVtbs: number[] = [];
        vtbInfosService.onUpdate((vtbInfos) => {
            const followVtbs = getFollowLists().map((followList: FollowList) => ([...followList.mids]))[0];
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
            lastLiveVtbs = nowLiveFollowedVtbs;
            upLiveFollowedVtbs.forEach((mid: number) => {
                win.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "上播提醒")
            })
            downLiveFollowedVtbs.forEach((mid: number) => {
                win.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "下播提醒")
            })
        })
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
        event.reply('getFollowListsReply', getFollowLists());
    });
    ipcMain.on('addFollowList', (event: Electron.IpcMainEvent, name: string) => {
        addFollowList(name);
        event.reply('addFollowListReply', getFollowLists());;
    });
    ipcMain.on('deleteFollowList', (event: Electron.IpcMainEvent, id: number) => {
        deleteFollowList(id);
        event.reply('deleteFollowListReply', getFollowLists());;
    });
    ipcMain.on('renameFollowList', (event: Electron.IpcMainEvent, id: number, name: string) => {
        renameFollowList(id, name);
        event.reply('renameFollowListReply', getFollowLists());;
    });
    ipcMain.on('follow', (event: Electron.IpcMainEvent, mid: number) => {
        follow(mid);
        event.reply('followReply', vtbInfosService.getFollowedVtbMids());;
    });
    ipcMain.on('setFollowList', (event: Electron.IpcMainEvent, mids: number[], listId: number) => {
        setFollowList(mids, listId)
        event.reply('setFollowListReply', getFollowLists());;
    });
})();




