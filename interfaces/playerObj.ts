import { BrowserWindow } from 'electron';

export interface PlayerObj {
    cid: number,
    playerWin: BrowserWindow,
    danmakuWin: BrowserWindow

}