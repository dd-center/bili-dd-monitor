import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { VtbInfoService, FollowListService } from './services';
import { PlayerObj } from '../../interfaces';
import { autoUpdater } from 'electron-updater';
import { FollowList, VtbInfo } from '../../interfaces';
import { createMainWin } from './mainWindow';
import { createPlayerWin } from './playerWindow';

let vtbInfosService: VtbInfoService;
let mainWin: BrowserWindow;
let playerObjMap = new Map<number, PlayerObj>();
const updateInit = () => {
    autoUpdater.setFeedURL('https://dd.center/api/update/ddmonitor/');
    autoUpdater.checkForUpdates();
    autoUpdater.autoDownload = false;
    autoUpdater.on('update-available', () => {
        autoUpdater.downloadUpdate();
    })
    autoUpdater.on('update-downloaded', (info) => {
        dialog.showMessageBox(<any>{
            type: 'info',
            title: '发现新版本：' + info.version,
            message: '发现新版本：' + info.version,
            detail: '更新内容：' + info.releaseNotes,
            buttons: ['退出并更新', '暂不更新'],
            cancelId: 1
        }).then(value => {
            if (value.response == 0) {
                autoUpdater.quitAndInstall();
            }
        })
    })
}
const ipcInit = () => {
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
        console.log(FollowListService.getFollowLists())
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
    ipcMain.on('showPlayer', (event: Electron.IpcMainEvent, cid: number) => {
        if (playerObjMap.has(cid)) {
            playerObjMap.get(cid).playerWin.focus();
        } else {
            playerObjMap.set(cid, createPlayerWin(app, vtbInfosService.getVtbInfos().find((vtbInfo: VtbInfo) => vtbInfo.roomid == cid), playerObjMap, vtbInfosService));
        }
    })
}
const appInit = () => {
    updateInit();
    vtbInfosService = new VtbInfoService();
    FollowListService.initFollowList();
    let lastLiveVtbs: number[] = [];
    vtbInfosService.onUpdate((vtbInfos) => {
        if (mainWin) {
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
                mainWin.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "上播提醒")
            })
            downLiveFollowedVtbs.forEach((mid: number) => {
                mainWin.webContents.send('liveNotice', vtbInfos.find((vtbInfo: VtbInfo) => vtbInfo.mid == mid), "下播提醒")
            })
            lastLiveVtbs = nowLiveFollowedVtbs;
        }
    })
    ipcInit();
}
app.once('ready', () => {
    appInit();
    vtbInfosService.onceUpdate(() => {
        createMainWin(app, playerObjMap)
    })
})