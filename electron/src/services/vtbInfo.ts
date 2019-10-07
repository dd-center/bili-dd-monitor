import * as io from 'socket.io-client';
const socket = io('https://api.vtbs.moe');
import { VtbInfo } from '../../../interfaces';

export class VtbInfoService {
    private vtbInfos: VtbInfo[] = [];
    private update: Function = null;
    constructor() {
        socket.on('info', (infos: VtbInfo[]) => {
            this.vtbInfos = [...this.vtbInfos, ...infos];
            if (this.update) {
                this.update(this.vtbInfos);
            }
        })
    }
    onUpdate(callback: (vtbInfos: VtbInfo[]) => void) {
        this.update = callback;

    }
    getVtbInfos(): VtbInfo[] {
        return this.vtbInfos;
    }
}